import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ColorTag } from './color-tag.entity';

@Entity('todo_list')
export class TodoList {
  @PrimaryGeneratedColumn()
  todo_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => ColorTag, (colorTag) => colorTag.todos)
  @JoinColumn({ name: 'color_tag' })
  colorTag: ColorTag;

  @Column({ type: 'text' })
  todo_text: string;

  @Column()
  status: number;

  @Column({ type: 'date' })
  target_date: Date;

  @Column({ type: 'time' })
  target_time: string;
}
