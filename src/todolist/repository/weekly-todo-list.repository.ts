import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeeklyTodoList } from '../entity/weekly-todo-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeeklyTodoListRepository {
  constructor(
    @InjectRepository(WeeklyTodoList)
    private readonly weeklyTodoListRepository: Repository<WeeklyTodoList>,
  ) {}

  async create(data: Partial<WeeklyTodoList>) {
    return this.weeklyTodoListRepository.save(data);
  }

  async getOneByPk(weekly_schedule_id: number) {
    return this.weeklyTodoListRepository.findOne({
      where: { weekly_schedule_id },
    });
  }
}
