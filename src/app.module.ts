import { Module } from '@nestjs/common';
import { StudiesModule } from './studies/studies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/postgres.config';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from './config/redis.config';
import { StudyPostsModule } from './study-posts/study-posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(postgresConfig),
    CacheModule.registerAsync(redisConfig),
    StudiesModule,
    AuthModule,
    UsersModule,
    StudyPostsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
