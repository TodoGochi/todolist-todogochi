import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColorTagType } from '../constant/color-tag.type';

@Entity('color_tag_complete_date')
export class ColorTagCompleteDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'complete_date' })
  completeDate: number;

  @Column({ name: 'color_tag' })
  colorTag: ColorTagType;
}
