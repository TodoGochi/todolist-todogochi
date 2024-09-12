import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ColorTag } from './color-tag.entity';

@Entity('color_tag_complete_date')
export class ColorTagCompleteDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'date' })
  complete_date: Date;

  @ManyToOne(() => ColorTag)
  @JoinColumn({ name: 'color_tag' })
  colorTag: ColorTag;
}
