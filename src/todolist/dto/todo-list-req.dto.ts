import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
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

  @IsOptional()
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

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm required)' })
  targetTime: string;
}

export class TodoIdReqParamDto {
  @Type(() => Number)
  @IsInt()
  todoId: number;
}

export class GetTodoListsByPeriodReqParamDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  startDate: number;

  @Type(() => Number)
  @IsInt()
  endDate: number;
}

export class UpdateTodoListReqBodyDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsString()
  @IsOptional()
  todoText: string;

  @IsString()
  @IsOptional()
  colorTag: ColorTagType;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm required)' })
  targetTime: string;

  @IsOptional()
  @IsInt()
  targetDate: number;
}

export class UserIdReqQueryDto {
  @Type(() => Number)
  @IsInt()
  userId: number;
}
