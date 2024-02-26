import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayLoadType } from '../type';

@Injectable()
export class JwtAccessService {
  constructor(private jwtService: JwtService) {}

  login(payload: PayLoadType) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
