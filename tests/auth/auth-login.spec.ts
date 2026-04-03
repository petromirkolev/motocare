import { test } from '../fixtures/auth-fixtures';
import {
  EMAIL_REQUIRED,
  INVALID_CREDENTIALS,
  INVALID_EMAIL,
  LOGIN_SUCCESS_UI,
  PASS_REQUIRED,
} from '../utils/constants';
import { invalidEmailInput, invalidPasswordInput } from '../utils/test-data';

test.describe('Login page test suite', () => {
  test('User can log in with registered credentials', async ({
    registeredUser,
    loginPage,
    garagePage,
  }) => {
    await loginPage.login(registeredUser);
    await loginPage.expectLoginSuccess(LOGIN_SUCCESS_UI);
    await garagePage.expectGarageVisible();
  });

  test('Login fails with unregistered credentials', async ({
    loginPage,
    validUserInput,
  }) => {
    await loginPage.login(validUserInput);
    await loginPage.expectLoginError(INVALID_CREDENTIALS);
  });

  test('Login with missing email', async ({ loginPage, validUserInput }) => {
    await loginPage.login({
      ...validUserInput,
      email: undefined,
    });
    await loginPage.expectLoginError(EMAIL_REQUIRED);
  });

  test('Login with missing password', async ({ loginPage, validUserInput }) => {
    await loginPage.login({ ...validUserInput, password: undefined });
    await loginPage.expectLoginError(PASS_REQUIRED);
  });

  for (const key of Object.keys(invalidEmailInput) as Array<
    keyof typeof invalidEmailInput
  >) {
    const { value, testDescription } = invalidEmailInput[key];

    test(`Login fails with: ${testDescription}`, async ({
      loginPage,
      validUserInput,
    }) => {
      await loginPage.login({ ...validUserInput, email: value });

      if (value === '    ' || value === '') {
        await loginPage.expectLoginError(EMAIL_REQUIRED);
      } else {
        await loginPage.expectLoginError(INVALID_EMAIL);
      }
    });
  }

  for (const key of Object.keys(invalidPasswordInput) as Array<
    keyof typeof invalidPasswordInput
  >) {
    const { value, testDescription } = invalidPasswordInput[key];

    test(`Login fails with: ${testDescription}`, async ({
      loginPage,
      validUserInput,
    }) => {
      await loginPage.login({ ...validUserInput, password: value });

      if (value === '    ' || value === '') {
        await loginPage.expectLoginError(PASS_REQUIRED);
      } else {
        await loginPage.expectLoginError(INVALID_CREDENTIALS);
      }
    });
  }
});
