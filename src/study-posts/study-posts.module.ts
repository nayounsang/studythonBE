import { Module } from '@nestjs/common';
import { StudyPostsController } from './study-posts.controller';
import { StudyPostsService } from './study-posts.service';
import { UsersModule } from 'src/users/users.module';
import { StudyPost } from './study-posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesModule } from 'src/studies/studies.module';

@Module({
  imports: [UsersModule, StudiesModule, TypeOrmModule.forFeature([StudyPost])],
  controllers: [StudyPostsController],
  providers: [StudyPostsService],
})
export class StudyPostsModule {}
