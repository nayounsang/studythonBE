import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStudyDTO {
  @IsOptional()
  @IsNotEmpty()
  title?: string;
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
