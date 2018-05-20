export default function DayService() {

    const today = Number(moment().format("D"));

    this.isDayOff = (day, month) => day.day_off || day.number === '' || isPreviousDay(day, month);

    this.isToday = (day, month) => month === moment().month() && today === day.number;

    function isPreviousDay(day, month) {
        return month === moment().month() && Number(day.number) < today;
    }
}