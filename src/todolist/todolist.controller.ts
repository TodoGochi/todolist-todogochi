import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import {
  CreateTodoListReqDto,
  CreateWeeklyTodoListReqBodyDto,
  GetTodoListsByDayReqParamDto,
  GetTodoListsByPeriodReqParamDto,
  TodoIdReqParamDto,
  UpdateTodoListReqBodyDto,
} from './dto/todo-list-req.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('specific-day')
  async createSpecificDayTodoList(@Body() body: CreateTodoListReqDto) {
    return this.todolistService.createSpecificDayTodoList(body);
  }

  @Post('weekly')
  async createWeeklyTodoList(@Body() body: CreateWeeklyTodoListReqBodyDto) {
    return this.todolistService.createWeeklyTodoList(body);
  }

  @Get(':userId/:targetDate')
  async getTodoListsByDay(@Param() params: GetTodoListsByDayReqParamDto) {
    return this.todolistService.getTodoListsByDay(params);
  }

  @Post('complete/:todoId')
  async completeTodoList(@Param() params: TodoIdReqParamDto) {
    return this.todolistService.completeTodoList(params.todoId);
  }

  @Get('period/:userId/:startDate/:endDate')
  async getTodoListsByPeriod(@Param() params: GetTodoListsByPeriodReqParamDto) {
    return this.todolistService.getTodoListsByPeriod(params);
  }

  @Put('update/:todoId')
  async updateTodoList(
    @Param() params: TodoIdReqParamDto,
    @Body() body: UpdateTodoListReqBodyDto,
  ) {
    return this.todolistService.updateTodoList(params.todoId, body);
  }
}
