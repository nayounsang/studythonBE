import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtRefreshService } from './jwt-refresh.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '30d' },
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtRefreshStrategy, JwtRefreshService],
  exports: [JwtRefreshService],
})
export class JwtRefreshModule {}
