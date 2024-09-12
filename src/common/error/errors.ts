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
};
