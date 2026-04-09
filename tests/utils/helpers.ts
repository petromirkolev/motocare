import { APIResponse, expect } from '@playwright/test';
import { ValidBikeInput } from '../types/bike';

export async function expectApiSuccess(
  response: APIResponse,
  status: number,
  type: string,
  message: string,
): Promise<void> {
  expect(response.status()).toBe(status);

  const body = await response.json();

  expect(body[type]).toBe(message);
}

export async function expectApiError(
  response: APIResponse,
  status: number,
  type: string,
  message: string,
): Promise<void> {
  expect(response.status()).toBe(status);

  const body = await response.json();

  expect(body[type]).toBe(message);
}

export function expectBikeUpdateSuccess(
  bike: ValidBikeInput,
  input: ValidBikeInput,
) {
  expect(bike.make).toBe(input.make);
  expect(bike.model).toBe(input.model);
  expect(bike.year).toBe(input.year);
  expect(bike.odo).toBe(input.odo);
}
