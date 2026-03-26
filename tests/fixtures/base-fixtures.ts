import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { GaragePage } from '../pages/garage-page';
import { MaintenancePage } from '../pages/maintenance-page';

type PomFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  garagePage: GaragePage;
  maintenancePage: MaintenancePage;
};

export const test = base.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  garagePage: async ({ page }, use) => {
    await use(new GaragePage(page));
  },
  maintenancePage: async ({ page }, use) => {
    await use(new MaintenancePage(page));
  },
});

export { expect } from '@playwright/test';
