export default function CalendarController() {
    let vm = this;
    vm.currentDate = _.startCase(moment().format("MMMM YYYY"));
    vm.currentMonth = moment().format("MMMM");
}