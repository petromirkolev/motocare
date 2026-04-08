import { test } from '../fixtures/garage-fixtures';

test.describe('MMT - Garage empty E2E', () => {
  test('Garage shows empty state when no bikes are added', async ({
    loggedInUser,
    garagePage,
  }) => {
    await garagePage.expectGarageEmpty();
  });

  test('Garage shows empty state when all bikes are deleted', async ({
    loggedInUser,
    validBikeInput,
    garagePage,
  }) => {
    await garagePage.addBike(validBikeInput);
    await garagePage.expectBikeVisible(validBikeInput.make);
    await garagePage.deleteBikeByName(validBikeInput.make);
    await garagePage.expectBikeNotVisible(validBikeInput.make);
    await garagePage.expectGarageEmpty();
  });
});
