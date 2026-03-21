import { test, expect } from '@playwright/test';
import {
  API_URL,
  registerUser,
  loginUser,
  createBike,
  updateBike,
  listFirstBike,
} from '../utils/api-helpers';
import { uniqueEmail } from '../utils/test-data';

test.describe('Garage API test suite', () => {
  let email: string;
  let user_id: string;
  let bike_id: string;

  test.beforeEach(async ({ request }) => {
    email = uniqueEmail();
    await registerUser(request, email);
    const response = await loginUser(request, email);
    const body = await response.json();
    user_id = body.user.id;
  });

  test('Create bike with valid data succeeds', async ({ request }) => {
    const response = await createBike(request, user_id);

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.message).toBe('Bike created successfully');
  });

  test('Create bike with invalid year above maximum is rejected', async ({
    request,
  }) => {
    const response = await createBike(request, user_id, { year: 2101 });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Year must be an integer between 1900 and 2100');
  });

  test('Create bike with invalid year below minimum is rejected', async ({
    request,
  }) => {
    const response = await createBike(request, user_id, { year: 1899 });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Year must be an integer between 1900 and 2100');
  });

  test('Create bike with negative odometer is rejected', async ({
    request,
  }) => {
    const response = await createBike(request, user_id, { odo: -100 });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Odometer must be a non-negative integer');
  });

  test('Update bike with valid data succeeds', async ({ request }) => {
    const bikeResponse = await createBike(request, user_id);
    const body = await bikeResponse.json();
    bike_id = body.bike.id;

    const updateResponse = await updateBike(request, user_id, bike_id, {
      make: 'Honda',
      model: 'Rebel',
      odo: 1000,
      year: 2010,
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    expect(updateBody.message).toBe('Bike updated successfully');

    const bike = await listFirstBike(request, user_id);
    expect(bike.make).toBe('Honda');
    expect(bike.model).toBe('Rebel');
  });

  test('Update bike with lower odometer is rejected', async ({ request }) => {
    const bikeResponse = await createBike(request, user_id);
    const body = await bikeResponse.json();
    bike_id = body.bike.id;

    const updateResponse = await updateBike(request, user_id, bike_id, {
      make: 'Yamaha',
      model: 'Tracer 9GT',
      year: 2021,
      odo: 900,
    });

    expect(updateResponse.status()).toBe(400);

    const updateBody = await updateResponse.json();
    expect(updateBody.error).toBe('Odometer cannot decrease');
  });

  test('Delete bike succeeds', async ({ request }) => {
    const bikeResponse = await createBike(request, user_id);
    const body = await bikeResponse.json();
    bike_id = body.bike.id;

    const deleteResponse = await request.delete(
      `${API_URL}/bikes/${bike_id}?user_id=${user_id}`,
    );

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toBe('Bike deleted successfully');

    const bike = await listFirstBike(request, user_id);
    expect(bike).toBeUndefined();
  });
});
