import ConfigurationController from './component/dialog/configuration/configuration.controller'
import configurationTemplate from './component/dialog/configuration/configuration.html';

export default function CalendarController($mdDialog) {
    let vm = this;
    vm.currentMonth = moment().format("MMMM");
    vm.schedule = {
        work_days : ["пн: 8:00 - 15:00", "вт: 8:00 - 15:00", "ср: 8:00 - 15:00","чт: 8:00 - 15:00","пт: 8:00 - 15:00"],
        day_off: ["сб,вс: выходные"]};

    vm.monthsForSchedule = moment.months().slice(3,3+3).map(month=>_.startCase(month));
    vm.selectedMonth = vm.monthsForSchedule[0];

    vm.openConfiguration = () => $mdDialog.show({
        controller: ConfigurationController,
        template: configurationTemplate,
        clickOutsideToClose:true,
        fullscreen: true
    })
}