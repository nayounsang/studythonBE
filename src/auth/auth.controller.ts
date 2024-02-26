import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAccessService } from './jwt-access/jwt-access.service';
import { PayLoadType } from './type';
import { JwtRefreshGuard } from './jwt-refresh/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtAccessService: JwtAccessService) {}
  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const payload = req.user as PayLoadType;
    const { accessToken } = this.jwtAccessService.login({ id: payload.id });
    res.cookie('access_token', accessToken);
  }
}
