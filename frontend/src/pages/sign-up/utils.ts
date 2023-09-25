import { DateOfBirth } from "./model";

export function formatDateToString(dateObj: DateOfBirth): string {
  const { day, month, year } = dateObj;

  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}
