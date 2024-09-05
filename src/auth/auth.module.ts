import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtKakaoStrategy } from './strategy/jwt-kakao.strategy';

@Module({
  imports: [JwtModule.register({}), forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, JwtKakaoStrategy],
  exports: [AuthService],
})
export class AuthModule {}
