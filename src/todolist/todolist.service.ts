import { Injectable } from '@nestjs/common';
import { TodoListRepository } from './repository/todo-list.repository';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { ColorTagRepository } from './repository/color-tag.repository';
import { ColorTagType } from './constant/color-tag.type';

@Injectable()
export class TodolistService {
  constructor(
    private readonly todolistRepository: TodoListRepository,
    private readonly colorTagRepository: ColorTagRepository,
  ) {}

  async createSpecificDayTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    targetDate: string;
    targetTime: string;
  }) {
    const colorTag = await this.colorTagRepository.findOneByColor(
      input.colorTag,
    );
    const parsedDate = new Date(input.targetDate);
    const todoList = await this.todolistRepository.create({
      userId: input.userId,
      todoText: input.todoText,
      colorTag,
      targetDate: parsedDate,
      targetTime: input.targetTime,
    });

    return todoList;
  }
}
