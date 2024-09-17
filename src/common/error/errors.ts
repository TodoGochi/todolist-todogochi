import { HttpStatusCode } from 'axios';

export const ERRORS = {
  'TODOLIST-0000': {
    errorCode: 'TODOLIST-0000',
    message: 'Unknown error, please contact server administrator',
    statusCode: HttpStatusCode.InternalServerError,
  },
  'TODOLIST-0001': {
    errorCode: 'TODOLIST-0001',
    message: 'User not fount',
    statusCode: HttpStatusCode.NotFound,
  },
  'TODOLIST-0002': {
    errorCode: 'TODOLIST-0002',
    message: 'TodoList not found',
    statusCode: HttpStatusCode.NotFound,
  },
  'TODOLIST-0003': {
    errorCode: 'TODOLIST-0003',
    message: 'TodoList already completed',
    statusCode: HttpStatusCode.BadRequest,
  },
};
