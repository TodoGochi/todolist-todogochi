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

  async save(data: TodoList) {
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
    return this.todolistRepository.save({
      todoId,
      status: TodoListStatus.COMPLETE,
    });
  }

  async findMany(data: Partial<TodoList>) {
    return this.todolistRepository.find({ where: data });
  }

  async updateOne(todoId: number, data: Partial<TodoList>) {
    return this.todolistRepository.update({ todoId }, data);
  }

  async deleteOne(todoId: number) {
    return this.todolistRepository.delete({ todoId });
  }

  async deleteMany(where: any) {
    return this.todolistRepository.delete(where);
  }
}
