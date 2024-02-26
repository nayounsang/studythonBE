import { StudyPost } from 'src/study-posts/study-posts.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Study {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Index()
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => StudyPost, (studyPost) => studyPost.study)
  @JoinColumn({ name: 'studyPostsId' })
  studyPosts: StudyPost[];
}
