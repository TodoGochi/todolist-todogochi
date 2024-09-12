import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ColorTag } from './color-tag.entity';

@Entity('weekly_todo_list')
export class WeeklyTodoList {
  @PrimaryGeneratedColumn()
  weekly_schedule_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => ColorTag, (colorTag) => colorTag.weeklyTodos)
  @JoinColumn({ name: 'color_tag' })
  colorTag: ColorTag;

  @Column({ type: 'text' })
  todo_text: string;

  @Column()
  status: number;

  @Column({ type: 'varchar', length: 10 })
  day: string;

  @Column({ type: 'time' })
  target_time: string;
}
