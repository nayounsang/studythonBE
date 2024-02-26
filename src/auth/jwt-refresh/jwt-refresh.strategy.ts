import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRefreshService } from './jwt-refresh.service';
import { PayLoadType } from '../type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private jwtRefreshService: JwtRefreshService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayLoadType) {
    const authorization = req.headers?.authorization;
    if (!authorization || authorization.split(' ').length < 2) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    const refreshToken = authorization.split(' ')[1];
    const { id } = payload;
    if (!id) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    const flag = await this.jwtRefreshService.matchRefreshToken(
      id,
      refreshToken,
    );
    if (!flag) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
