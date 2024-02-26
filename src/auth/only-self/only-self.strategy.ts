import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayLoadType } from '../type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class OnlySelfStrategy extends PassportStrategy(Strategy, 'only-self') {
  constructor(
    configService: ConfigService,
    private httpService: HttpService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayLoadType) {
    const authorization = req.headers?.authorization;
    const { url } = req;
    if (!authorization || authorization.split(' ').length < 2) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    const { id } = payload;
    if (!id) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    const { data } = await firstValueFrom<AxiosResponse<any>>(
      this.httpService.get(`http://localhost:3000${url}`),
    );
    if (id != data.author?.id) {
      throw new HttpException('인증 실패', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
