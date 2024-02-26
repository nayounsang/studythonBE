import { Module } from '@nestjs/common';
import { JwtAccessModule } from '../jwt-access/jwt-access.module';
import { GithubStrategy } from './github.strategy';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { JwtRefreshModule } from '../jwt-refresh/jwt-refresh.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtAccessModule, JwtRefreshModule, UsersModule],
  controllers: [GithubController],
  providers: [GithubStrategy, GithubService],
})
export class GithubModule {}
