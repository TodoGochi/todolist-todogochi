import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColorTagType } from '../constant/color-tag.type';

@Entity('color_tag_complete_date')
export class ColorTagCompleteDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'date' })
  complete_date: Date;

  @Column({ name: 'color_tag' })
  colorTag: ColorTagType;
}
