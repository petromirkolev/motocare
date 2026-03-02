export type Bike = {
  id: string;
  name: string;
  year: number;
  model: string;
  odometerKm: number;
};

type StoreState = {
  bikes: Bike[];
};

const STORAGE_KEY = 'motocare:bikes';
