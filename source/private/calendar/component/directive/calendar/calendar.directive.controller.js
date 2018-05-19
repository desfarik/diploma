import dayConfig from "./days";

export default function CalendarController(DayService) {
    let vm = this;
    const DEFAULT_DAY = {number: -1};
    vm.selectedDay = DEFAULT_DAY;
    vm.weekdays = [...moment.weekdaysMin().slice(1), _.first(moment.weekdaysMin())];
    vm.days = _.chunk([...getFirstEmptyDays(), ...dayConfig.days, ...getLastEmptyDays()], 7);

    vm.toggleDay = (day) => {
        vm.selectedDay = vm.selectedDay.number === day.number ? DEFAULT_DAY : day;
    };

    vm.isDayOff = DayService.isDayOff;

    function getFirstEmptyDays() {
        const firstDayOfMonth = Number(moment().startOf('month').format('d'));
        const amountOfDays = !!firstDayOfMonth ? firstDayOfMonth - 1 : 6;
        return [...Array(amountOfDays)].map(() => {
            return {number: ''}
        });
    }

    function getLastEmptyDays() {
        const firstDayOfMonth = Number(moment().endOf('month').format('d'));
        console.log(firstDayOfMonth);
        const amountOfDays = !!firstDayOfMonth ? firstDayOfMonth : 6;
        return [...Array(amountOfDays)].map(() => {
            return {number: ''}
        });
    }
}