import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayLoadType } from '../type';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtRefreshService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  login(payload: PayLoadType) {
    return {
      refreshToken: this.jwtService.sign(payload),
    };
  }
  async setRefreshToken(id: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 5);
    return await this.cacheManager.set<string>(id, hashedToken);
  }
  async matchRefreshToken(id: string, refreshToken: string): Promise<boolean> {
    const hashedToken = await this.cacheManager.get<string>(id);
    return await bcrypt.compare(refreshToken, hashedToken);
  }
}
