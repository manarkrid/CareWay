"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const nodemailer = __importStar(require("nodemailer"));
const users_service_1 = require("../users/users.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, notificationsService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.notificationsService = notificationsService;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Cet email est déjà utilisé');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });
        const { password, ...result } = user;
        return {
            message: 'Compte créé avec succès',
            user: result,
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload);
        const { password, ...userWithoutPassword } = user;
        this.notificationsService.resetNotifications();
        return {
            message: 'Connexion réussie',
            access_token,
            user: userWithoutPassword,
        };
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return { message: 'Si l\'email correspond à un compte, un lien de réinitialisation a été envoyé.' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);
        await this.usersService.saveResetToken(user.id, resetToken, resetTokenExpiry);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const resetLink = `http://localhost:3002/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            from: `"CareWay Support" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Réinitialisation de votre mot de passe - CareWay',
            text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`,
            html: `<p>Bonjour ${user.firstName},</p><p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <br><br><a href="${resetLink}" style="padding: 10px 20px; background: #4169E1; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Réinitialiser mon mot de passe</a></p><p>Ce lien expirera dans 1 heure.</p>`,
        });
        return {
            message: 'Si l\'email correspond à un compte, un lien de réinitialisation a été envoyé.'
        };
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersService.findByResetToken(token);
        if (!user || !user.resetTokenExpiry) {
            throw new common_1.UnauthorizedException('Lien invalide ou expiré');
        }
        const now = new Date();
        if (now > user.resetTokenExpiry) {
            throw new common_1.UnauthorizedException('Lien expiré. Veuillez refaire une demande.');
        }
        await this.usersService.updateProfile(user.id, { password: newPassword });
        await this.usersService.saveResetToken(user.id, null, null);
        return { message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map