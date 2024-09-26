import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TodoListStatus } from '../constant/todo-list-status.enum';
import { ColorTagType } from '../constant/color-tag.type';

@Entity('todo_list')
export class TodoList {
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  todoId: number;

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

  @Column({ name: 'target_date' })
  targetDate: number;

  @Column({ name: 'target_time', nullable: true })
  targetTime: string;

  @Column({ name: 'weekly_schedule_id', default: null, nullable: true })
  weeklyScheduleId: number;
}
