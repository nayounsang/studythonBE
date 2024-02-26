import { AuthGuard } from '@nestjs/passport';
import { CreateStudyDTO } from './dto/create-study.dto';
import { UpdateStudyDTO } from './dto/update-study-dto';
import { UpdateStudyPipe } from './pipes/update-study.pipe';
import { Study } from './studies.entity';
import { StudiesService } from './studies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetStudyPagePipe } from './pipes/get-study-page.pipe';

@Controller('studies')
export class StudiesController {
  constructor(private studiesService: StudiesService) {}
  @Get()
  @UsePipes(ValidationPipe)
  async findStudiesByPage(
    @Query(GetStudyPagePipe) query: { page?: number; size?: number },
  ): Promise<Study[]> {
    const { page, size } = query;
    return await this.studiesService.findStudiesByPage(page, size);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt-access'))
  async createStudy(@Body() body: CreateStudyDTO): Promise<Study> {
    return await this.studiesService.createStudy(body);
  }
  @Get(':id')
  async findStudyById(@Param('id') id: number): Promise<Study> {
    return await this.studiesService.findStudyById(id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access'))
  async deleteStudyById(@Param('id') id: number) {
    return this.studiesService.deleteStudyById(id);
  }
  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt-access'))
  async updateStudyById(
    @Param('id') id: number,
    @Body(UpdateStudyPipe) body: UpdateStudyDTO,
  ) {
    return await this.studiesService.updateStudyById(id, body);
  }
}
