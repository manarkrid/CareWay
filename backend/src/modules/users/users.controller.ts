import { Controller, Get, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // GET /api/users/profile/:id
  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfile(id);
  }

  // GET /api/users/profile (returns first user as demo)
  @Get('profile')
  async getDefaultProfile() {
    return this.usersService.getProfile(1);
  }

  // PATCH /api/users/profile/:id
  @Patch('profile/:id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: any,
  ) {
    return this.usersService.updateProfile(id, updateData);
  }
}