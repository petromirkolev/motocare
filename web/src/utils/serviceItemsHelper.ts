export function checkServiceItemsStatus(item: any, selectedBike: any) {
  if (item.bikeId === selectedBike) return item;
}
