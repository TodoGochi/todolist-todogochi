import { Injectable } from '@nestjs/common';
import { TodoListRepository } from './repository/todo-list.repository';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { ColorTagType } from './constant/color-tag.type';
import { ApiError } from 'src/common/error/api.error';
import { TodoListStatus } from './constant/todo-list-status.enum';
import { WeeklyTodoListRepository } from './repository/weekly-todo-list.repository';
import { toZonedTime, format } from 'date-fns-tz';

@Injectable()
export class TodolistService {
  constructor(
    private readonly todolistRepository: TodoListRepository,
    private readonly weeklyTodoListRepository: WeeklyTodoListRepository,
  ) {}

  async createSpecificDayTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    targetDate: number;
    targetTime?: string;
  }) {
    // const now = new Date();
    // const targetDateTime = this.convertToDateTime(
    //   input.targetDate,
    //   input.targetTime,
    // );
    // if (targetDateTime < now) {
    //   throw new ApiError('TODOLIST-0004');
    // }
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

    const weeklyTodoLists = await this.weeklyTodoListRepository.getByUserId(
      input.userId,
      // TodoListStatus.INCOMPLETE,
    );
    if (weeklyTodoLists.length > 0) {
      const targetDay = this.getDayOfWeek(input.targetDate);

      const todaysWeeklyTodos = weeklyTodoLists.filter(
        (weeklyTodo) => weeklyTodo.day === targetDay,
      );

      const existingTodoTexts = todoLists.map((todo) => todo.todoText);

      for (const weeklyTodo of todaysWeeklyTodos) {
        if (!existingTodoTexts.includes(weeklyTodo.todoText)) {
          const newTodo = await this.todolistRepository.create({
            userId: input.userId,
            todoText: weeklyTodo.todoText,
            colorTag: weeklyTodo.colorTag,
            targetDate: input.targetDate,
            targetTime: weeklyTodo.targetTime,
            weeklyScheduleId: weeklyTodo.weeklyScheduleId,
          });
          todoLists.push(newTodo);
        }
      }
    }

    return todoLists;
  }

  async completeTodoList(todoId: number) {
    const todoList = await this.todolistRepository.getOneByPk(todoId);
    if (!todoList) {
      throw new ApiError('TODOLIST-0002');
    }
    if (todoList.status === TodoListStatus.COMPLETE) {
      throw new ApiError('TODOLIST-0003');
    }
    await this.todolistRepository.completeTodolist(todoId);

    return todoList;
  }

  async createWeeklyTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    days: string[];
    targetTime?: string;
  }) {
    for (const day of input.days) {
      const todoData = {
        userId: input.userId,
        todoText: input.todoText,
        colorTag: input.colorTag,
        day: day,
        targetTime: input.targetTime,
      };
      await this.weeklyTodoListRepository.create(todoData);
    }

    return { success: true };
  }

  private convertToDateTime(targetDate: number, targetTime: string): Date {
    const targetDateStr = targetDate.toString();
    const year = parseInt(targetDateStr.slice(0, 4), 10);
    const month = parseInt(targetDateStr.slice(4, 6), 10) - 1;
    const day = parseInt(targetDateStr.slice(6, 8), 10);
    const [hour, minute] = targetTime.split(':').map(Number);

    return new Date(year, month, day, hour, minute);
  }

  private getTodayDateAndDay(): { todayDate: number; todayDay: string } {
    const timeZone = 'Asia/Seoul';
    const now = toZonedTime(new Date(), timeZone);
    const todayDateStr = format(now, 'yyyyMMdd', { timeZone });
    const todayDate = parseInt(todayDateStr, 10);
    const todayDay = format(now, 'EEEE', { timeZone });

    return { todayDate, todayDay };
  }

  private getDayOfWeek(targetDate: number): string {
    const targetDateStr = targetDate.toString();
    const year = parseInt(targetDateStr.slice(0, 4), 10);
    const month = parseInt(targetDateStr.slice(4, 6), 10) - 1;
    const day = parseInt(targetDateStr.slice(6, 8), 10);
    const timeZone = 'Asia/Seoul';
    const date = new Date(year, month, day);
    const dayOfWeek = format(date, 'EEEE', { timeZone });

    return dayOfWeek;
  }

  async getTodoListsByPeriod(input: {
    userId: number;
    startDate: number;
    endDate: number;
  }) {
    const todoLists = [];
    const dateList = this.getDateRange(input.startDate, input.endDate);
    const weeklyTodoLists = await this.weeklyTodoListRepository.getByUserId(
      input.userId,
    );
    for (const targetDate of dateList) {
      const dailyTodoLists = await this.todolistRepository.getTodoListsByDay(
        input.userId,
        targetDate,
      );
      if (weeklyTodoLists.length > 0) {
        const targetDay = this.getDayOfWeek(targetDate);
        const todaysWeeklyTodos = weeklyTodoLists.filter(
          (weeklyTodo) => weeklyTodo.day === targetDay,
        );
        const existingTodoTexts = dailyTodoLists.map((todo) => todo.todoText);
        for (const weeklyTodo of todaysWeeklyTodos) {
          if (!existingTodoTexts.includes(weeklyTodo.todoText)) {
            const newTodo = await this.todolistRepository.create({
              userId: input.userId,
              todoText: weeklyTodo.todoText,
              colorTag: weeklyTodo.colorTag,
              targetDate: targetDate,
              targetTime: weeklyTodo.targetTime,
              weeklyScheduleId: weeklyTodo.weeklyScheduleId,
            });
            dailyTodoLists.push(newTodo);
          }
        }
      }
      todoLists.push(...dailyTodoLists);
    }

    return todoLists;
  }

  private getDateRange(startDate: number, endDate: number): number[] {
    const dateArray = [];
    const startDateObj = this.convertNumberToDate(startDate);
    const endDateObj = this.convertNumberToDate(endDate);

    for (
      let dt = new Date(startDateObj);
      dt <= endDateObj;
      dt.setDate(dt.getDate() + 1)
    ) {
      const dateStr = format(dt, 'yyyyMMdd');
      dateArray.push(parseInt(dateStr, 10));
    }
    return dateArray;
  }

  private convertNumberToDate(dateNumber: number): Date {
    const dateStr = dateNumber.toString();
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1;
    const day = parseInt(dateStr.slice(6, 8), 10);
    return new Date(year, month, day);
  }
}
