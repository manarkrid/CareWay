import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // POST /api/auth/register
  @Post('register')
  async register(
    @Body()
    registerDto: {
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
    },
  ) {
    return this.authService.register(registerDto);
  }

  // POST /api/auth/login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
  ) {
    return this.authService.login(loginDto);
  }

  // POST /api/auth/forgot-password
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) {
      return { message: "L'email est requis" };
    }
    return this.authService.forgotPassword(email);
  }

  // POST /api/auth/reset-password
  @Post('reset-password')
  async resetPassword(@Body() resetDto: { token: string; newPassword: string }) {
    if (!resetDto.token || !resetDto.newPassword) {
      return { message: "Paramètres manquants" };
    }
    return this.authService.resetPassword(resetDto.token, resetDto.newPassword);
  }
}