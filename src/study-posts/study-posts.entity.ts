import { Study } from 'src/studies/studies.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StudyPost {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  url: string;
  @ManyToOne(() => User, (user) => user.wroteStudyPosts)
  @JoinColumn({ name: 'authorId' })
  author: User;
  @ManyToOne(() => Study, (study) => study.studyPosts)
  @JoinColumn({ name: 'studyId' })
  study: Study;
}
