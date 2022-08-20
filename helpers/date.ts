export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function formateDate(d: Date) {
  let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return date;
}

export function addSubstractDays(d: Date, days: number) {
  let date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}
