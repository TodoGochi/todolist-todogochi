import {
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ColorTagType } from '../constant/color-tag.type';

export class CreateTodoListReqDto {
  @IsInt()
  userId: number;

  @IsString()
  colorTag: ColorTagType;

  @IsString()
  todoText: string;

  @IsInt({ message: 'targetDate must be a valid integer' })
  @Min(19000101, { message: 'targetDate must be a valid date' })
  @Max(99991231, { message: 'targetDate must be a valid date' })
  targetDate: number;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'targetTime must be in HH:mm format' })
  targetTime: string;
}
