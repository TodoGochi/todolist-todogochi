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
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  todoId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => ColorTag, (colorTag) => colorTag.todos)
  @JoinColumn({ name: 'color_tag' })
  colorTag: ColorTag;

  @Column({ type: 'text', name: 'todo_text' })
  todoText: string;

  @Column()
  status: number;

  @Column({ type: 'date', name: 'target_date' })
  targetDate: Date;

  @Column({ type: 'time', name: 'target_time' })
  targetTime: string;
}
