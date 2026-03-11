import { Response } from 'express';
import { ErrorResponse } from '../types/auth';

export function sendAuthError(
  res: Response,
  statusCode: number,
  message: string,
): void {
  const body: ErrorResponse = { error: message };
  res.status(statusCode).json(body);
}
