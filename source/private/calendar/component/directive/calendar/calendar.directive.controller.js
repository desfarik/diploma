export default function CalendarController(DayService, $scope) {
    let vm = this;
    const DEFAULT_DAY = {number: -1};
    vm.selectedDay = DEFAULT_DAY;
    vm.weekdays = [...moment.weekdaysMin().slice(1), _.first(moment.weekdaysMin())];

    $scope.$on("update", (e, month) => {
        if (!_.isEmpty(month)) {
            vm.month = _.clone(month);
            vm.month.days = setFuckingNumbers(vm.month.days);
            console.log(vm.month);
            vm.days = _.chunk([...getFirstEmptyDays(vm.month.month), ...vm.month.days, ...getLastEmptyDays(vm.month.month)], 7);
        } else {
            vm.days = [];
        }
    });

    vm.toggleDay = (day) => {
        vm.selectedDay = vm.selectedDay.number === day.number ? DEFAULT_DAY : day;
    };

    vm.isDayOff = DayService.isDayOff;

    function getFirstEmptyDays(id) {
        const firstDayOfMonth = Number(moment().month(id).startOf('month').format('d'));
        const amountOfDays = !!firstDayOfMonth ? firstDayOfMonth - 1 : 6;
        return [...Array(amountOfDays)].map(() => {
            return {number: ''}
        });
    }

    function getLastEmptyDays(id) {
        const lastDayOfMonth = Number(moment().month(id).endOf('month').format('d'));
        const amountOfDays = 7 - lastDayOfMonth;
        return [...Array(amountOfDays)].map(() => {
            return {number: ''}
        });
    }

    function setFuckingNumbers(days) {
        let newDays = [];
        for (let i = 0; i < days.length; i++) {
            newDays.push({
                day_off: days[i].day_off,
                talons: days[i].talons,
                number: i + 1
            })
        }
        return newDays;
    }
}