import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpdateStudyPipe implements PipeTransform {
  transform(value: any) {
    const { title, description } = value;
    if (!title && !description) {
      throw new BadRequestException(
        'At least title or description is required.',
      );
    }
    return value;
  }
}
