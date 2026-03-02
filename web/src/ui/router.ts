import {
  renderBikeScreen,
  renderGarageScreen,
  renderInitialScreen,
  renderRegisterScreen,
} from '../dom/render';
import { dom } from '../dom/selectors';
import { editBike, removeBikeFromGarage } from './bike';

function bindEvents(): void {
  dom.loginBtn?.addEventListener('click', renderGarageScreen);
  dom.logout?.addEventListener('click', renderInitialScreen);
  dom.registerBtn?.addEventListener('click', renderRegisterScreen);
  dom.registerBackBtn?.addEventListener('click', renderInitialScreen);
  dom.bikeBtn.forEach((bike) =>
    bike.addEventListener('click', renderBikeScreen),
  );
  dom.backToGarageBtn?.addEventListener('click', renderGarageScreen);
  dom.deleteBikeBtn?.forEach((bike) =>
    bike.addEventListener('click', (e) => removeBikeFromGarage(e)),
  );
  dom.editBikeBtn.forEach((bike) => bike.addEventListener('click', editBike));
}

export { bindEvents };
