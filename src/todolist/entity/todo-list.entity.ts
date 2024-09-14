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
    type: 'enum',
    enum: TodoListStatus,
    default: TodoListStatus.INCOMPLETE,
  })
  status: TodoListStatus;

  @Column({ type: 'date', name: 'target_date' })
  targetDate: Date;

  @Column({ name: 'target_time' })
  targetTime: string;
}
