import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAccessService } from '../jwt-access/jwt-access.service';
import { JwtRefreshService } from '../jwt-refresh/jwt-refresh.service';
import { GithubGuard } from './github.guard';

@Controller('auth/github')
export class GithubController {
  constructor(
    private jwtAccessService: JwtAccessService,
    private jwtRefreshService: JwtRefreshService,
  ) {}
  @Get()
  @UseGuards(GithubGuard)
  async login() {}

  @Get('callback')
  @UseGuards(GithubGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const payload = { id: req.user as string };
    const { accessToken } = this.jwtAccessService.login(payload);
    const { refreshToken } = this.jwtRefreshService.login(payload);
    res.cookie('access_token', accessToken);
    res.cookie('refresh_token', refreshToken);
    await this.jwtRefreshService.setRefreshToken(payload.id, refreshToken);
    res.redirect('http://localhost:3001/login/success');
  }
}
