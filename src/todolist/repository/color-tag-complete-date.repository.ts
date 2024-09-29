import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorTagCompleteDate } from '../entity/color-tag-complete-date.entity';
import { Repository } from 'typeorm';
import { ColorTagType } from '../constant/color-tag.type';

@Injectable()
export class ColorTagCompleteDateRepository {
  constructor(
    @InjectRepository(ColorTagCompleteDate)
    private readonly colorTagCompleteDateRepository: Repository<ColorTagCompleteDate>,
  ) {}

  async create(data: Partial<ColorTagCompleteDate>) {
    return this.colorTagCompleteDateRepository.save(data);
  }

  async isCompleteDate(
    userId: number,
    completeDate: number,
    colorTag: ColorTagType,
  ) {
    return this.colorTagCompleteDateRepository.findOne({
      where: { userId, completeDate, colorTag },
    });
  }
}
