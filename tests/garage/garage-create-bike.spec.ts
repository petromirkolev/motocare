import { test } from '@playwright/test';
import { GaragePage } from '../pages/garage-page';
import { RegisterPage } from '../pages/register-page';
import { LoginPage } from '../pages/login-page';

function makeBike() {
  return {
    make: `Test Bike ${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    model: 'Tracer 9 GT',
    year: '2021',
    odometer: '12000',
  };
}

test.describe('Garage page test suite', () => {
  let garagePage: GaragePage;
  const email = 'garage-seeded@example.com';
  const password = 'testingpass';

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.gotoreg();
    await registerPage.register(email, password);
    await registerPage.expectSuccess('Registration successful');

    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.expectSuccess('Login success, opening garage...');
    await garagePage.expectLoaded();
  });

  test.describe('Create bike', () => {
    test('Create bike with valid data', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm(bike);
      await garagePage.expectBikeVisible(bike.make);
    });

    test('Create bike with missing make and valid other fields', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({ ...bike, make: '' });
      await garagePage.expectError('Make is required');
      await garagePage.expectBikeNotVisible(bike.make);
    });

    test('Create bike with missing model and valid other fields', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({
        ...bike,
        make: 'Yamaha',
        model: '',
      });
      await garagePage.expectError('Model is required');
      await garagePage.expectBikeNotVisible('Yamaha');
    });

    test('Create bike with missing year and valid other fields', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({
        ...bike,
        make: 'Yamaha',
        year: '',
      });
      await garagePage.expectError('Invalid year');
      await garagePage.expectBikeNotVisible('Yamaha');
    });

    test('Create bike with empty odo when odo is optional', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({
        ...bike,
        make: 'Yamaha',
        odometer: '',
      });
      await garagePage.expectBikeVisible('Yamaha');
    });

    test('Create bike with missing all fields', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({
        ...bike,
        make: '',
        model: '',
        year: '',
        odometer: '',
      });
      await garagePage.expectError('Make is required');
      await garagePage.expectBikeNotVisible(bike.make);
    });
  });

  test.describe('Create bike with invalid data', () => {
    test('Create bike with invalid year < 1900', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({ ...bike, year: '1899' });
      await garagePage.expectError('Invalid year');
      await garagePage.expectBikeNotVisible(bike.make);
    });

    test('Create bike with invalid year > 2100', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({ ...bike, year: '2101' });
      await garagePage.expectError('Invalid year');
      await garagePage.expectBikeNotVisible(bike.make);
    });

    test('Create bike with invalid odo < 0 km', async () => {
      const bike = makeBike();

      await garagePage.fillAndSubmitBikeForm({
        ...bike,
        odometer: '-100',
      });
      await garagePage.expectError('Invalid odo');
      await garagePage.expectBikeNotVisible(bike.make);
    });
  });
});
