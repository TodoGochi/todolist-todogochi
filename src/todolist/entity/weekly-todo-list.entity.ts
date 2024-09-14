import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColorTagType } from '../constant/color-tag.type';

@Entity('weekly_todo_list')
export class WeeklyTodoList {
  @PrimaryGeneratedColumn()
  weekly_schedule_id: number;

  @Column()
  user_id: number;

  @Column({ name: 'color_tag' })
  colorTag: ColorTagType;

  @Column({ type: 'text' })
  todo_text: string;

  @Column()
  status: number;

  @Column({ type: 'varchar', length: 10 })
  day: string;

  @Column({ type: 'time' })
  target_time: string;
}
