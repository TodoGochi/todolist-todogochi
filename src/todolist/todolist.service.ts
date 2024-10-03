import { Injectable } from '@nestjs/common';
import { TodoListRepository } from './repository/todo-list.repository';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { ColorTagType } from './constant/color-tag.type';
import { ApiError } from 'src/common/error/api.error';
import { TodoListStatus } from './constant/todo-list-status.enum';
import { WeeklyTodoListRepository } from './repository/weekly-todo-list.repository';
import { toZonedTime, format } from 'date-fns-tz';
import { ColorTagCompleteDateRepository } from './repository/color-tag-complete-date.repository';
import { TodoCompleteDateRepository } from './repository/todo-complete-date.repository';
import { omitBy, isUndefined } from 'lodash';

@Injectable()
export class TodolistService {
  constructor(
    private readonly todolistRepository: TodoListRepository,
    private readonly weeklyTodoListRepository: WeeklyTodoListRepository,
    private readonly colorTagCompleteDateRepository: ColorTagCompleteDateRepository,
    private readonly userService: UserServer,
    private readonly todoCompleteDateRepository: TodoCompleteDateRepository,
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
    const completedTodolist = await this.todolistRepository.completeTodolist(
      todoId,
    );
    const colorTag = todoList.colorTag;
    const completeDate = todoList.targetDate;
    this.rewardCompleteTodoList(todoList.userId, completeDate, colorTag);
    return completedTodolist;
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

  private async rewardCompleteTodoList(
    userId: number,
    completeDate: number,
    colorTag: ColorTagType,
  ) {
    const isAllColorTagInComplete = await this.todolistRepository.findMany({
      userId,
      targetDate: completeDate,
      status: TodoListStatus.INCOMPLETE,
      colorTag,
    });
    if (isAllColorTagInComplete.length === 0) {
      const isAlReadyColorTagCompleteReward =
        await this.colorTagCompleteDateRepository.isCompleteDate(
          userId,
          completeDate,
          colorTag,
        );
      if (!isAlReadyColorTagCompleteReward) {
        await this.colorTagCompleteDateRepository.create({
          userId,
          completeDate,
          colorTag,
        });
        // 색상태그 투두리스트 완료시 보상 1코인
        await this.userService.post({
          path: `/user/${userId}/coin-transactions`,
          data: {
            changeAmount: 1,
            description: `컬러태그 ${colorTag} 완료`,
          },
        });
      }
    }
    const isAllAlReadyAllColorTagCompleteReward =
      await this.todolistRepository.findMany({
        userId,
        targetDate: completeDate,
        status: TodoListStatus.INCOMPLETE,
      });
    if (isAllAlReadyAllColorTagCompleteReward.length === 0) {
      const isAlReadyAllCompleteReward =
        await this.todoCompleteDateRepository.isCompleteDate(
          userId,
          completeDate,
        );
      if (!isAlReadyAllCompleteReward) {
        await this.todoCompleteDateRepository.create({
          userId,
          completeDate,
        });
        // 전체 투두리스트 완료시 보상 2코인
        await this.userService.post({
          path: `/user/${userId}/coin-transactions`,
          data: {
            changeAmount: 2,
            description: `모든 투두리스트 완료`,
          },
        });
      }
    }

    return;
  }

  async updateTodoList(
    todoId: number,
    input: {
      userId?: number;
      todoText?: string;
      colorTag?: ColorTagType;
      targetTime?: string;
      targetDate?: number;
    },
  ) {
    const todoList = await this.todolistRepository.getOneByPk(todoId);
    if (!todoList) {
      throw new ApiError('TODOLIST-0002');
    }
    if (todoList.userId !== input.userId) {
      throw new ApiError('TODOLIST-0005');
    }
    const updateData = omitBy(input, isUndefined);
    Object.assign(todoList, updateData);
    const updatedTodoList = await this.todolistRepository.save(todoList);

    return updatedTodoList;
  }
}
