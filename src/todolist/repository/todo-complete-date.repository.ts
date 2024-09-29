import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCompleteDate } from '../entity/todo-complete-date.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoCompleteDateRepository {
  constructor(
    @InjectRepository(TodoCompleteDate)
    private readonly todoCompleteDateRepository: Repository<TodoCompleteDate>,
  ) {}

  async create(data: Partial<TodoCompleteDate>) {
    return this.todoCompleteDateRepository.save(data);
  }

  async isCompleteDate(userId: number, completeDate: number) {
    return this.todoCompleteDateRepository.findOne({
      where: { userId, completeDate },
    });
  }
}
