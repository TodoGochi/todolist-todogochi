import { IsDate, IsInt, IsString, Matches } from 'class-validator';
import { ColorTagType } from '../constant/color-tag.type';

export class CreateTodoListReqDto {
  @IsInt()
  userId: number;

  @IsString()
  colorTag: ColorTagType;

  @IsString()
  todoText: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'targetDate must be in YYYY-MM-DD format',
  })
  targetDate: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'targetTime must be in HH:mm format' })
  targetTime: string;
}
