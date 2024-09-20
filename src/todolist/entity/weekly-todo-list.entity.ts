import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColorTagType } from '../constant/color-tag.type';
import { TodoListStatus } from '../constant/todo-list-status.enum';

@Entity('weekly_todo_list')
export class WeeklyTodoList {
  @PrimaryGeneratedColumn({ name: 'weekly_schedule_id' })
  weeklyScheduleId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'color_tag' })
  colorTag: ColorTagType;

  @Column({ type: 'text', name: 'todo_text' })
  todoText: string;

  @Column({
    type: 'tinyint',
    default: TodoListStatus.INCOMPLETE,
  })
  status: TodoListStatus;

  @Column({ type: 'varchar', length: 10 })
  day: string;

  @Column({ name: 'target_time' })
  targetTime: string;
}
