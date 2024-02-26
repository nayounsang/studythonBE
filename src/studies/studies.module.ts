import { Module } from '@nestjs/common';
import { StudiesController } from './studies.controller';
import { StudiesService } from './studies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './studies.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Study])],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [TypeOrmModule, StudiesService],
})
export class StudiesModule {
  constructor(private dataSource: DataSource) {}
}
