import ConfigurationController from './component/dialog/configuration/configuration.controller'
import configurationTemplate from './component/dialog/configuration/configuration.html';

export default function CalendarController($mdDialog, CalendarService, $translate) {
    let vm = this;
    vm.currentMonth = moment().format("MMMM");
    vm.schedule = {
        work_days: ["пн: 8:00 - 15:00", "вт: 8:00 - 15:00", "ср: 8:00 - 15:00", "чт: 8:00 - 15:00", "пт: 8:00 - 15:00"],
        day_off: ["сб,вс: выходные"]
    };

    vm.monthsForSchedule = moment.months().slice(3, 3 + 3).map(month => _.startCase(month));
    vm.selectedMonth = vm.monthsForSchedule[0];

    init();

    function init() {
        CalendarService.getCalendars().then(calendar => {
            vm.calendar = calendar;
            console.log(vm.calendar);
        });
    }

    vm.save = () => {
        CalendarService.saveCalendars(vm.calendar)
            .then(response => {
                openSuccessfulDialog();
                console.log(response);
            }, error => {
                console.log(error);
            });
    };

    vm.openConfiguration = () => $mdDialog.show({
        controller: ConfigurationController,
        template: configurationTemplate,
        clickOutsideToClose: true,
        fullscreen: true
    });

    function openSuccessfulDialog() {
        $translate('private.calendar.success_save').then(text =>
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .textContent(text)
                    .ok('OK')
            )
        )
    }
}