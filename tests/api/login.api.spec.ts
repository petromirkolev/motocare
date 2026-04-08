import { test, expect } from '../fixtures/api-fixtures';
import { api } from '../utils/api-helpers';
import { msg } from '../../constants/constants';

test.describe('MMT API - Login', () => {
  test('Login with valid credentials succeeds', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, registeredUser);
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    expect(loginBody.message).toBe(msg.USER_LOG_OK);
  });

  test('Login with wrong password is rejected', async ({
    request,
    registeredUser,
    invalidUserInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: invalidUserInput.password,
    });
    expect(loginResponse.status()).toBe(401);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(msg.CRED_INVALID);
  });

  test('Login with non existing email is rejected', async ({
    request,
    registeredUser,
    invalidUserInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: invalidUserInput.email,
    });
    expect(loginResponse.status()).toBe(401);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(msg.CRED_INVALID);
  });

  test('Login with missing email is rejected', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: undefined,
    });
    expect(loginResponse.status()).toBe(400);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(msg.EMAIL_PASS_REQ);
  });

  test('Login with missing password is rejected', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: undefined,
    });
    expect(loginResponse.status()).toBe(400);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(msg.EMAIL_PASS_REQ);
  });
});
