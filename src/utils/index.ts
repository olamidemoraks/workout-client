export function getDaysOfWeekWithDates(): { name: string; date: string }[] {
  const daysOfWeekWithDates = [];
  const today = new Date();
  const currentDay = today.getDay(); // Get the current day (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  for (let i = -3; i < 5; i++) {
    const date = new Date(today); // Create a new Date object based on the current date
    date.setDate(today.getDate() - currentDay + i); // Set the date to the corresponding day of the week

    // Push an object containing the day name and the date into the array
    daysOfWeekWithDates.push({
      name: getDayName(date.getDay()),
      date: date.toLocaleDateString(),
    });
  }

  return daysOfWeekWithDates;
}

function getDayName(index: number): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[index];
}
