import { StudyPost } from 'src/study-posts/study-posts.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; // provider + id
  @Column()
  name: string;
  @Column()
  avatarURL: string;
  @OneToMany(() => StudyPost, (post) => post.author)
  @JoinColumn({ name: 'wroteStudyPosts' })
  wroteStudyPosts: StudyPost[];
}
