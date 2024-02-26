import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAccessModule } from './jwt-access/jwt-access.module';
import { JwtRefreshModule } from './jwt-refresh/jwt-refresh.module';
import { OnlySelfModule } from './only-self/only-self.module';

@Module({
  imports: [GithubModule, JwtAccessModule, JwtRefreshModule, OnlySelfModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
