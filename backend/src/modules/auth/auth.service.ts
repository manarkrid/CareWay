import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly notificationsService: NotificationsService,
  ) { }

  async register(registerDto: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    birthDate?: string;
  }) {
    // Check if email already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create the user in DB
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Return user without password
    const { password, ...result } = user;
    return {
      message: 'Compte créé avec succès',
      user: result,
    };
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;

    // Reset notifications pour la démo
    this.notificationsService.resetNotifications();

    return {
      message: 'Connexion réussie',
      access_token,
      user: userWithoutPassword,
    };
  }

  async forgotPassword(email: string) {
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

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetToken(token);

    if (!user || !user.resetTokenExpiry) {
      throw new UnauthorizedException('Lien invalide ou expiré');
    }

    const now = new Date();
    if (now > user.resetTokenExpiry) {
      throw new UnauthorizedException('Lien expiré. Veuillez refaire une demande.');
    }

    // updateProfile already hashes the password
    await this.usersService.updateProfile(user.id, { password: newPassword });
    await this.usersService.saveResetToken(user.id, null, null);

    return { message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' };
  }
}