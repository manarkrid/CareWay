import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly notificationsService;
    constructor(usersService: UsersService, jwtService: JwtService, notificationsService: NotificationsService);
    register(registerDto: {
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
    }): Promise<{
        message: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: string;
            address: string;
            postalCode: string;
            city: string;
            country: string;
            birthDate: string;
            resetToken: string;
            resetTokenExpiry: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: string;
            address: string;
            postalCode: string;
            city: string;
            country: string;
            birthDate: string;
            resetToken: string;
            resetTokenExpiry: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
