import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';
import { WeeklyTodoList } from './weekly-todo-list.entity';

@Entity('color_tag')
export class ColorTag {
  @PrimaryColumn()
  color_tag: string;

  @Column({ type: 'varchar', length: 50 })
  color: string;

  @OneToMany(() => TodoList, (todoList) => todoList.colorTag)
  todos: TodoList[];

  @OneToMany(() => WeeklyTodoList, (weeklyTodoList) => weeklyTodoList.colorTag)
  weeklyTodos: WeeklyTodoList[];
}
