import { IsNotEmpty } from 'class-validator';

export class CreateStudyDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
