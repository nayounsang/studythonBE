import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  async getCurrentUser(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return await this.usersService.findUserById(id);
  }
}
