type Screen = 'login' | 'garage' | 'bike';

// Go to garage
document
  .querySelector('[data-testid="btn-login"]')
  .addEventListener('click', () => {
    document
      .querySelector('[data-testid="screen-login"]')
      ?.classList.add('is-hidden');
    document
      .querySelector('[data-testid="screen-garage"]')
      ?.classList.remove('is-hidden');
  });

// Go to bike
document
  .querySelector('[data-testid="bike-open-1"]')
  ?.addEventListener('click', () => {
    document
      .querySelector('[data-testid="screen-bike"]')
      ?.classList.remove('is-hidden');
    document
      .querySelector('[data-testid="screen-garage"]')
      ?.classList.add('is-hidden');
  });
