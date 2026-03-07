////  On each page load/reload, update:
// Due / Overdue / On track
// Recent History
// Record
// Last
// Due

// import type { Maintenance } from '../types/maintenance';
// import type { StoreState } from '../types/state';
import { dom } from '../dom/selectors';

export function readMaintenanceLogForm(form: HTMLFormElement) {
  const fd = new FormData(form);

  const date = String(fd.get('doneAt') ?? '').trim();
  const odo = String(fd.get('odo') ?? '').trim();

  if (!date) throw new Error('Date is required');
  if (!odo) throw new Error('Odo is required');

  return { date, odo };
}

export const maintenanceStore = {
  addLog(target: string) {
    const form = (dom.logServiceForm as HTMLFormElement) || null;
    const input = readMaintenanceLogForm(form);

    console.log(target);

    // odo should not be less than actual odo
    console.log(input);
  },
  schedule() {
    console.log('log scheduled');
  },
};
