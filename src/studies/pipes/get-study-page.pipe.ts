import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GetStudyPagePipe implements PipeTransform {
  transform(value: any) {
    if (value.page === undefined) {
      value.page = 1;
    }
    if (value.size === undefined) {
      value.size = 10;
    }
    return value;
  }
}
