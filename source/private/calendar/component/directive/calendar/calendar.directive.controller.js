import dayConfig from "./days";

export default function CalendarController(DayService) {
    let vm = this;
    const DEFAULT_DAY = {number: -1};
    vm.selectedDay = DEFAULT_DAY;
    vm.weekdays = [...moment.weekdaysMin().slice(1), _.first(moment.weekdaysMin())];
    vm.days = _.chunk([...getEmptyDays(), ...dayConfig.days, ...getEmptyDays()], 7);

    vm.toggleDay = (day) => {
        vm.selectedDay = vm.selectedDay.number === day.number ? DEFAULT_DAY : day;
    };

    vm.isDayOff = DayService.isDayOff;

    function getEmptyDays() {
        const firstDayOfMonth = Number(moment().startOf('month').format('d'));
        const amountOfDays = !!firstDayOfMonth ? firstDayOfMonth - 1 : 6;
        return [...Array(amountOfDays)].map(() => {
            return {number: ''}
        });
    }
}