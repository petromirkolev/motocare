import { test } from '../fixtures/api-fixtures';
import { api } from '../utils/api-helpers';
import { msg } from '../../constants/constants';
import { expectApiError, expectApiSuccess } from '../utils/helpers';

test.describe('MMT API - Login', () => {
  test('Login with valid credentials returns 200', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, registeredUser);

    expectApiSuccess(loginResponse, 200, 'message', msg.USER_LOG_OK);
  });

  test('Login with wrong password returns 401', async ({
    request,
    registeredUser,
    invalidUserInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: invalidUserInput.password,
    });

    expectApiError(loginResponse, 401, 'error', msg.CRED_INVALID);
  });

  test('Login with non existing email returns 401', async ({
    request,
    registeredUser,
    invalidUserInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: invalidUserInput.email,
    });

    expectApiError(loginResponse, 401, 'error', msg.CRED_INVALID);
  });

  test('Login with missing email returns 400', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: undefined,
    });

    expectApiError(loginResponse, 400, 'error', msg.EMAIL_PASS_REQ);
  });

  test('Login with missing password returns 400', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: undefined,
    });

    expectApiError(loginResponse, 400, 'error', msg.EMAIL_PASS_REQ);
  });
});
