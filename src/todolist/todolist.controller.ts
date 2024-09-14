import { Body, Controller, Post } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodoListReqDto } from './dto/todo-list-req.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('specific-day')
  async createSpecificDayTodoList(@Body() body: CreateTodoListReqDto) {
    return this.todolistService.createSpecificDayTodoList(body);
  }
}
