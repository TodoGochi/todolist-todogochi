import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SignUpType } from '../constant/sign-up.enum';
import { RefreshToken } from './refresh-token.entity';
import { UserRole } from '../constant/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'enum',
    enum: SignUpType,
    name: 'sign_up_type',
  })
  signUpType: SignUpType;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshToken: RefreshToken;
}
