import { Injectable } from '@nestjs/common';
import { TodoListRepository } from './repository/todo-list.repository';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { ColorTagType } from './constant/color-tag.type';
import { format } from 'date-fns';

@Injectable()
export class TodolistService {
  constructor(private readonly todolistRepository: TodoListRepository) {}

  async createSpecificDayTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    targetDate: string;
    targetTime: string;
  }) {
    const parsedDate = new Date(input.targetDate);
    const todoList = await this.todolistRepository.create({
      userId: input.userId,
      todoText: input.todoText,
      colorTag: input.colorTag,
      targetDate: parsedDate,
      targetTime: input.targetTime,
    });
    const result = await this.todolistRepository.getOneByPk(todoList.todoId);
    return result;
    return todoList;
  }
}
