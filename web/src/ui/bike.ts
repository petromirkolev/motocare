function addBikeToGarage(): void {
  // add bike
}

function editBike(): void {
  // edit bike
  console.log('edit bike');
}

function removeBikeFromGarage(e: Event) {
  // remove bike
  const target = e.target as HTMLElement;
  const bikeCard = target.closest('.bikeCard');
  bikeCard?.remove();
}

export { removeBikeFromGarage, addBikeToGarage, editBike };
