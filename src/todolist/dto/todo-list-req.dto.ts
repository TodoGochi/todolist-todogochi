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
import { Type } from 'class-transformer';

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

export class GetTodoListsByDayReqParamDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt({ message: 'targetDate must be a valid integer' })
  @Min(19000101, { message: 'targetDate must be a valid date' })
  @Max(99991231, { message: 'targetDate must be a valid date' })
  targetDate: number;
}

export class CompleteTodolistReqBodyDto {
  @Type(() => Number)
  @IsInt()
  todoId: number;
}
