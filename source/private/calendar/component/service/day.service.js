export default function DayService() {

    const today = Number(moment().format("D"));

    this.isDayOff = (day) => day.day_off || day.number === '' || isPreviousDay(day);

    this.isToday = (day) => today === day.number;

    function isPreviousDay(day) {
        return Number(day.number) < today;
    }
}