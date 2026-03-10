export type MaintenanceLog = {
  id: string;
  bikeId: string;
  name: string | undefined;
  date: string | null;
  odo: number | null;
  intervalKm: number | null;
  intervalDays: number | null;
};
