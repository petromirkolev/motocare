import type { Maintenance } from '../types/maintenance';

export function checkServiceItemsStatus(item: Maintenance, selectedBike: any) {
  if (item.bikeId === selectedBike) return item;
}
