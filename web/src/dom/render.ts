import { dom } from './selectors';
import { bikeStore } from '../state/bikeStore';
import { createBikeCard } from '../ui/createBikeCard';
import { showScreen } from '../ui/showScreen';
import { req } from '../utils/domHelper';

export const render = {
  initialScreen(): void {
    showScreen('login');
  },

  registerScreen(): void {
    showScreen('register');
  },

  garageScreen(): void {
    showScreen('garage');

    const grid = req(dom.bikeGrid, 'bikeGrid');

    grid.innerHTML = '';

    const bikes = bikeStore.getBikes();

    req(dom.userEmail, 'userEmail').textContent = 'Hello, {user}!';
    req(dom.garageCount, 'garageCount').textContent =
      bikes.length > 1 || bikes.length === 0
        ? `${bikes.length} motorcycles`
        : `${bikes.length} motorcycle`;

    bikes.forEach((bike) => grid.appendChild(createBikeCard(bike)));

    bikes.length > 0
      ? req(dom.garageEmpty, 'garageEmpty').classList.add('is-hidden')
      : req(dom.garageEmpty, 'garageEmpty').classList.remove('is-hidden');
  },

  maintenanceScreen() {
    showScreen('bike');
  },

  addBikeScreen(): void {
    showScreen('bikeAdd');
  },

  editBikeScreen(): void {
    showScreen('bikeEdit');
  },

  openServiceModal(target: any): void {
    if (target === 'log.service')
      dom.maintenanceModal?.classList.remove('is-hidden');

    if (target === 'schedule.service')
      dom.maintenanceScheduleModal?.classList.remove('is-hidden');
  },

  closeServiceModal(): void {
    dom.maintenanceModal?.classList.add('is-hidden');
    dom.maintenanceScheduleModal?.classList.add('is-hidden');
  },
};
