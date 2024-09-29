import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todo_complete_date')
export class TodoCompleteDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'complete_date' })
  completeDate: number;
}
