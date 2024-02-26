import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudyDTO } from './dto/create-study.dto';
import { UpdateStudyDTO } from './dto/update-study-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from './studies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
  ) {}
  /**TODO: use cache */
  async findStudiesByPage(page: number, size: number): Promise<Study[]> {
    const offset = (page - 1) * size;
    return await this.studiesRepository
      .createQueryBuilder('study')
      .orderBy('study.createdAt', 'DESC')
      .offset(offset)
      .limit(size)
      .getMany();
  }
  async createStudy(study: CreateStudyDTO): Promise<Study> {
    const newStudy = this.studiesRepository.create({ ...study });
    return await this.studiesRepository.save(newStudy);
  }
  async findStudyById(id: number): Promise<Study> {
    const study = await this.studiesRepository.findOneBy({ id: id });
    if (!study) {
      throw new HttpException(`스터디를 찾지 못했어요.`, HttpStatus.NOT_FOUND);
    }
    return study;
  }
  async deleteStudyById(id: number): Promise<number> {
    const deleteResult = await this.studiesRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException(
        `삭제할 스터디를 찾지 못했어요.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return HttpStatus.NO_CONTENT;
  }
  async updateStudyById(id: number, study: UpdateStudyDTO): Promise<Study> {
    const result = await this.studiesRepository.update(id, { ...study });
    if (result.affected === 0) {
      throw new HttpException(
        `수정할 스터디를 찾지 못했어요.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.studiesRepository.findOneBy({ id: id });
  }
}
