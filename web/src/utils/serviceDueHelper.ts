export function checkDueStatus(item: any, selectedBike: any) {
  if (!item.intervalDays || !item.date) return;
  if (item.bikeId !== selectedBike) return;

  const nextDate: any = new Date(item.date);
  nextDate.setDate(nextDate.getDate() + Number(item.intervalDays));
  const currentDate: any = new Date(item.date);
  const dueDays = (nextDate - currentDate) / 86400000;

  if (dueDays < 30) return item;
}
