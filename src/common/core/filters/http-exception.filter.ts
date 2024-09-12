import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { ERRORS } from 'src/common/error/errors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    return response.status(status).json({
      errorCode:
        exceptionResponse.errorCode || ERRORS['TODOLIST-0000'].errorCode,
      message: exceptionResponse.message || ERRORS['TODOLIST-0000'].message,
    });
  }
}
