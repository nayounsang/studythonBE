import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyPost } from './study-posts.entity';
import { CreateStudyPostDTO } from './dto/create-study-post.dto';
import { StudiesService } from 'src/studies/studies.service';

@Injectable()
export class StudyPostsService {
  constructor(
    @InjectRepository(StudyPost)
    private studyPostsRepository: Repository<StudyPost>,
    private usersService: UsersService,
    private studiesService: StudiesService,
  ) {}
  async findStudyPostWithId(id: number): Promise<StudyPost> {
    const studyPost = await this.studyPostsRepository
      .createQueryBuilder('studyPost')
      .leftJoin('studyPost.author', 'author')
      .leftJoin('studyPost.study', 'study')
      .select(['studyPost', 'author.name', 'author.id', 'study.title'])
      .where('studyPost.id = :id', { id })
      .getOne();
    if (!studyPost) {
      throw new HttpException(`포스트를 찾지 못했어요.`, HttpStatus.NOT_FOUND);
    }
    return studyPost;
  }
  async createStudyPost(
    userId: string,
    dto: CreateStudyPostDTO,
  ): Promise<StudyPost> {
    const user = await this.usersService.findUserById(userId);
    const study = await this.studiesService.findStudyById(dto.studyId);
    const newStudyPost = this.studyPostsRepository.create({
      author: user,
      study: study,
      url: dto.url,
      description: dto.description,
    });
    return await this.studyPostsRepository.save(newStudyPost);
  }
  async deleteStudyPost(id: number) {
    const deleteResult = await this.studyPostsRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException(
        `삭제할 포스트를 찾지 못했어요.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return HttpStatus.NO_CONTENT;
  }
  async updateStudyPost() {}
}
