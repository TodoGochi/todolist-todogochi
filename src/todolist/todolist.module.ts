import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { ColorTagCompleteDate } from './entity/color-tag-complete-date.entity';
import { TodoCompleteDate } from './entity/todo-complete-date.entity';
import { TodoList } from './entity/todo-list.entity';
import { WeeklyTodoList } from './entity/weekly-todo-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListRepository } from './repository/todo-list.repository';
import { ServerModule } from 'src/provider/server/server.module';
import { WeeklyTodoListRepository } from './repository/weekly-todo-list.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColorTagCompleteDate,
      TodoCompleteDate,
      TodoList,
      WeeklyTodoList,
    ]),
    ServerModule,
  ],
  controllers: [TodolistController],
  providers: [TodolistService, TodoListRepository, WeeklyTodoListRepository],
})
export class TodolistModule {}
