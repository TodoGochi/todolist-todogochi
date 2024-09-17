import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import {
  CreateTodoListReqDto,
  GetTodoListsByDayReqParamDto,
} from './dto/todo-list-req.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('specific-day')
  async createSpecificDayTodoList(@Body() body: CreateTodoListReqDto) {
    return this.todolistService.createSpecificDayTodoList(body);
  }

  @Get(':userId/:targetDate')
  async getTodoListsByDay(@Param() params: GetTodoListsByDayReqParamDto) {
    return this.todolistService.getTodoListsByDay(params);
  }
}
