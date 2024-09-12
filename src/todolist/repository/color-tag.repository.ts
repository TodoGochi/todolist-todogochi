import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from '../entity/todo-list.entity';
import { Repository } from 'typeorm';
import { ColorTag } from '../entity/color-tag.entity';
import { ColorTagType } from '../constant/color-tag.type';

@Injectable()
export class ColorTagRepository {
  constructor(
    @InjectRepository(ColorTag)
    private readonly colorTagRepository: Repository<ColorTag>,
  ) {}

  async findOneByColor(color: ColorTagType) {
    return this.colorTagRepository.findOne({
      where: {
        colorTag: color,
      },
    });
  }
}
