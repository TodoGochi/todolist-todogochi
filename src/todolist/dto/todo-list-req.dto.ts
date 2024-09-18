import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
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

export class CreateWeeklyTodoListReqBodyDto {
  @IsNumber()
  userId: number;

  @IsString()
  todoText: string;

  @IsString()
  colorTag: ColorTagType;

  @IsArray()
  @ArrayNotEmpty({ message: 'Days array should not be empty' })
  @ArrayMinSize(1, { message: 'At least one day is required' })
  @Matches(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/, {
    each: true,
    message: 'Invalid day of the week',
  })
  days: string[];

  @Matches(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm required)' })
  targetTime: string;
}
