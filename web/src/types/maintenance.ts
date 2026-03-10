export type Maintenance = {
  id: string;
  bikeId: string;
  name: string | undefined;
  date: string | null;
  odo: number | null;
  intervalKm: number | null;
  intervalDays: number | null;
};

export type MaintenanceLogInput = {
  date: string | null;
  odo: number | null;
};

export type MaintenanceScheduleInput = {
  intervalDays: string | null;
  intervalKm: number | null;
};

export type MaintenanceLogPatch = Partial<
  Omit<Maintenance, 'id' | 'bikeId' | 'name'>
>;

export type MaintenanceSchedulePatch = Partial<
  Omit<Maintenance, 'id' | 'bikeId' | 'name' | 'odo' | 'date'>
>;
