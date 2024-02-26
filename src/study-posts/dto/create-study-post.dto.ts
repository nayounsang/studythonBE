import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStudyPostDTO {
  @IsOptional()
  description: string;
  @IsNotEmpty()
  url: string;
  @IsNumber()
  studyId: number;
}
