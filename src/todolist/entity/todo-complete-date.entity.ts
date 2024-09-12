import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todo_complete_date')
export class TodoCompleteDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'date' })
  complete_date: Date;
}
