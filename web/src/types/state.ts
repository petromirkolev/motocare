import type { Bike } from './bikes';

export type StoreState = {
  bikes: Bike[];
};

type AppState = {
  selectedBikeId: string | undefined;
  selectedBikeFound: Bike | undefined;
};

export const appState: AppState = {
  selectedBikeId: undefined,
  selectedBikeFound: undefined,
};
