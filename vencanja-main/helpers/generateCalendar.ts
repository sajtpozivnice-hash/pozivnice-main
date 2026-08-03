export interface CalendarDay {
  day: number;
  currentMonth: boolean;
  isEventDay: boolean;
  date: Date;
}

export const generateCalendar = (eventDate: Date): CalendarDay[] => {
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();

  let startDay = firstDayOfMonth.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const calendar: CalendarDay[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;

    calendar.push({
      day,
      currentMonth: false,
      isEventDay: false,
      date: new Date(year, month - 1, day),
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({
      day: i,
      currentMonth: true,
      isEventDay: i === eventDate.getDate(),
      date: new Date(year, month, i),
    });
  }

  while (calendar.length < 42) {
    const day = calendar.length - (startDay + daysInMonth) + 1;

    calendar.push({
      day,
      currentMonth: false,
      isEventDay: false,
      date: new Date(year, month + 1, day),
    });
  }

  return calendar;
};
