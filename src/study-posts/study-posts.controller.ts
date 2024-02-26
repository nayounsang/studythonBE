import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudyPostsService } from './study-posts.service';
import { Request } from 'express';
import { CreateStudyPostDTO } from './dto/create-study-post.dto';
import { JwtAccessGuard } from 'src/auth/jwt-access/jwt-access.guard';
import { OnlySelfGuard } from 'src/auth/only-self/only-self.guard';

@Controller('study-posts')
export class StudyPostsController {
  constructor(private studyPostsService: StudyPostsService) {}
  @Get(':id')
  async findStudyPostWithId(@Param('id') id: number) {
    return await this.studyPostsService.findStudyPostWithId(id);
  }
  @Delete(':id')
  @UseGuards(OnlySelfGuard)
  async deleteStudyPostWithId(@Param('id') id: number) {
    return await this.studyPostsService.deleteStudyPost(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAccessGuard)
  async createStudyPost(@Req() req: Request, @Body() dto: CreateStudyPostDTO) {
    const { id } = req.user as { id: string };
    return await this.studyPostsService.createStudyPost(id, dto);
  }
}
