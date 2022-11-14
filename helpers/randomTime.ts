const randomTime = (minBoundaryHours: number, maxBoundaryHours: number): string => {
  let currentDate = new Date();
  let currentHour = currentDate.getUTCHours();
  let currentMinutes = currentDate.getMinutes();

  currentHour = Math.round(Math.random() * currentHour);
  currentMinutes = Math.round(Math.random() * currentMinutes);

  let hoursFormat = currentHour < 10 ? "0" : "";
  let minutesFormat = currentMinutes < 10 ? "0" : "";

  if (Number(currentHour + hoursFormat) > maxBoundaryHours || Number(currentHour + hoursFormat) < minBoundaryHours) {
    return randomTime(minBoundaryHours, maxBoundaryHours);
  } else {
    return `${currentHour.toString() + hoursFormat.toString()}:${
      currentMinutes.toString() + minutesFormat.toString()
    }:00`;
  }
};

export default randomTime;
