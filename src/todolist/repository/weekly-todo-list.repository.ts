import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeeklyTodoList } from '../entity/weekly-todo-list.entity';
import { Repository } from 'typeorm';
import { TodoListStatus } from '../constant/todo-list-status.enum';

@Injectable()
export class WeeklyTodoListRepository {
  constructor(
    @InjectRepository(WeeklyTodoList)
    private readonly weeklyTodoListRepository: Repository<WeeklyTodoList>,
  ) {}

  async create(data: Partial<WeeklyTodoList>) {
    return this.weeklyTodoListRepository.save(data);
  }

  async getOneByPk(weeklyScheduleId: number) {
    return this.weeklyTodoListRepository.findOne({
      where: { weeklyScheduleId },
    });
  }

  async getByUserId(userId: number, status?: number) {
    return this.weeklyTodoListRepository.find({
      where: { userId, status },
    });
  }

  async deleteOne(weeklyScheduleId: number) {
    return this.weeklyTodoListRepository.delete({ weeklyScheduleId });
  }
}
