import { expect, test } from '../fixtures/maintenance-fixtures';

test.describe('Maintenance logs', () => {
  test('Maintenance log modal is opening', async ({ maintenancePage }) => {
    await maintenancePage.openMaintenanceLogModal('oil-change');
  });

  test('Maintenance log with valid date and odometer saves and shows in UI', async ({
    maintenancePage,
  }) => {
    await maintenancePage.goto();

    await maintenancePage.logMaintenance('oil-change', doneAt, odo);
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );
  });

  test('Canceling maintenance log does not change UI', async () => {
    await maintenancePage.goto();
    await maintenancePage.openMaintenanceLogModal('oil-change');
    await expect(maintenancePage.maintenanceLogModal).toBeVisible();

    await maintenancePage.fillMaintenanceLog(doneAt, odo);
    await maintenancePage.cancelMaintenanceLog();

    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'Never logged',
    );
  });

  test('Maintenance log negative odo is rejected', async () => {
    await maintenancePage.goto();
    await maintenancePage.openMaintenanceLogModal('oil-change');
    await expect(maintenancePage.maintenanceLogModal).toBeVisible();

    await maintenancePage.fillMaintenanceLog(doneAt, '-100');
    await maintenancePage.saveMaintenanceLog();

    await maintenancePage.expectLogError('Odo must be a positive number');
  });

  test('Page reload preserves maintenance logs', async () => {
    await maintenancePage.goto();

    await maintenancePage.logMaintenance('oil-change', doneAt, odo);
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );

    await maintenancePage.page.reload();
    await maintenancePage.goto();

    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );
  });

  test('Newer maintenance log replaces current maintenance log', async () => {
    await maintenancePage.goto();

    await maintenancePage.logMaintenance('oil-change', doneAt, odo);
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );

    await maintenancePage.page.reload();
    await maintenancePage.goto();

    await maintenancePage.logMaintenance('oil-change', '2026-03-17', '200');
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 17, 2026 at 200 km.',
    );
  });

  test('Logging one maintenance item does not affect another maintenance item', async () => {
    await maintenancePage.goto();

    await maintenancePage.logMaintenance('oil-change', doneAt, odo);
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );

    await maintenancePage.logMaintenance('coolant-change', '2026-03-18', '300');
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );
    await maintenancePage.expectTaskFieldContains(
      'coolant-change',
      'last',
      'March 18, 2026 at 300 km.',
    );
  });

  test('Logging maintenance for bike A does not affect bike B', async ({
    page,
  }) => {
    const bike2 = makeBike();

    await garagePage.fillAddBikeForm(bike2);
    await garagePage.expectBikeVisible(bike2.make);

    const bikeCard = page.locator('.bikeCard__main').filter({
      hasText: bike.make,
    });

    await bikeCard.click();

    await maintenancePage.logMaintenance('oil-change', doneAt, odo);
    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'March 16, 2026 at 100 km.',
    );

    await page.reload();

    const bike2Card = page.locator('.bikeCard__main').filter({
      hasText: bike2.make,
    });

    await bike2Card.click();

    await maintenancePage.expectTaskFieldContains(
      'oil-change',
      'last',
      'Never logged',
    );
  });
});
