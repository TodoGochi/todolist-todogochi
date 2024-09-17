import { Injectable } from '@nestjs/common';
import { TodoListRepository } from './repository/todo-list.repository';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { ColorTagType } from './constant/color-tag.type';
import { format } from 'date-fns';
import { ApiError } from 'src/common/error/api.error';
import { TodoListStatus } from './constant/todo-list-status.enum';

@Injectable()
export class TodolistService {
  constructor(private readonly todolistRepository: TodoListRepository) {}

  async createSpecificDayTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    targetDate: number;
    targetTime: string;
  }) {
    const todoList = await this.todolistRepository.create({
      userId: input.userId,
      todoText: input.todoText,
      colorTag: input.colorTag,
      targetDate: input.targetDate,
      targetTime: input.targetTime,
    });

    return todoList;
  }

  async getTodoListsByDay(input: { userId: number; targetDate: number }) {
    const todoLists = await this.todolistRepository.getTodoListsByDay(
      input.userId,
      input.targetDate,
    );

    return todoLists;
  }

  async completeTodolist(input: { todoId: number }) {
    const todoList = await this.todolistRepository.getOneByPk(input.todoId);
    if (!todoList) {
      throw new ApiError('TODOLIST-0002');
    }
    if (todoList.status === TodoListStatus.COMPLETE) {
      throw new ApiError('TODOLIST-0003');
    }
    await this.todolistRepository.completeTodolist(input.todoId);

    return todoList;
  }
}
