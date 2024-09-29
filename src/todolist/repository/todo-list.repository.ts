import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from '../entity/todo-list.entity';
import { Repository } from 'typeorm';
import { TodoListStatus } from '../constant/todo-list-status.enum';

@Injectable()
export class TodoListRepository {
  constructor(
    @InjectRepository(TodoList)
    private readonly todolistRepository: Repository<TodoList>,
  ) {}

  async create(data: Partial<TodoList>) {
    return this.todolistRepository.save(data);
  }

  async getOneByPk(todoId: number) {
    return this.todolistRepository.findOne({ where: { todoId } });
  }

  async getTodoListsByDay(userId: number, targetDate: number) {
    return this.todolistRepository.find({
      where: { userId, targetDate },
    });
  }

  async completeTodolist(todoId: number) {
    return this.todolistRepository.update(
      { todoId },
      { status: TodoListStatus.COMPLETE },
    );
  }

  async findMany(data: Partial<TodoList>) {
    return this.todolistRepository.find({ where: data });
  }
}
