import { test as base, expect } from './base-fixtures';
import { invalidInput, uniqueEmail, validInput } from '../utils/test-data';
import { InvalidUserInput, ValidUserInput } from '../types/auth';
import { api } from '../utils/api-helpers';

type AuthFixtures = {
  validUserInput: ValidUserInput;
  invalidUserInput: InvalidUserInput;
  registeredUser: ValidUserInput;
  loggedInUser: ValidUserInput;
};

export const test = base.extend<AuthFixtures>({
  validUserInput: async ({}, use) => {
    await use({
      email: uniqueEmail(),
      password: validInput.password,
      confirmPassword: validInput.password,
    });
  },

  invalidUserInput: async ({}, use) => {
    const { email, password, shortPassword, longPassword } = invalidInput;
    await use({ email, password, shortPassword, longPassword });
  },

  registeredUser: async ({ request, validUserInput }, use) => {
    await api.registerUser(request, { ...validUserInput });
    await use({ ...validUserInput });
  },

  loggedInUser: async (
    { request, registeredUser, registerPage, loginPage, garagePage },
    use,
  ) => {
    await api.loginUser(request, { ...registeredUser });

    await use({ ...registeredUser });

    // await expect(loginPage.loginScreen).toBeVisible();

    // await loginPage.login(user.email, user.password);
    // await garagePage.expectGarageVisible();

    // await use(user);
  },
});

export { expect };
