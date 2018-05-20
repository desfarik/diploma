import ConfigurationController from './component/dialog/configuration/configuration.controller'
import configurationTemplate from './component/dialog/configuration/configuration.html';
import appPatientTemplate from './component/dialog/addPatient/add-patient.html';
import AddPatientController from "./component/dialog/addPatient/add-patient.controller";

export default function CalendarController($mdDialog, CalendarService, $translate, $scope, UserService) {
    let vm = this;
    init();
    vm.deleteCalendar = false;

    function init() {
        UserService.getPatients()
            .then(r => {
                console.log(r);
            });
        vm.loading = CalendarService.getCalendars()
            .then(saveCalendar);
    }

    $scope.$on("addPatient", (e, info) => {
        openAddPatientDialog(moment(`${vm.selectedMonth.month}.${info.day.number}`).format("D MMMM"), vm.selectedMonth.days[info.day.number - 1].talons[info.index])
            .then(patient => {
                    vm.selectedMonth.days[info.day.number - 1].talons[info.index].patient = {
                        name: patient.display,
                        id: patient.id
                    }
                }
            )
    });

    vm.update = () => {
        vm.selectedMonth = vm.calendars.filter(m => m.month === vm.selectedMonthId.id)[0];
        vm.loading = new Promise(resolve => setTimeout(() => {
            resolve()
        }, 500));
        $scope.$broadcast('update', vm.selectedMonth);

    };

    vm.save = () => {
        vm.loading = CalendarService.saveCalendars(vm.calendars, vm.schedule)
            .then(openSuccessfulDialog, openErrorDialog);
    };

    vm.openConfiguration = () => $mdDialog.show({
        controller: ConfigurationController,
        template: configurationTemplate,
        clickOutsideToClose: true,
        fullscreen: true
    }).then(saveCalendar);

    function openSuccessfulDialog() {
        $translate('private.calendar.success_save').then(text =>
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent(text)
                    .ok('OK')
            )
        )
    }

    function openErrorDialog() {
        $translate('private.calendar.error').then(text =>
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent(text)
                    .ok('OK')
            )
        )
    }

    function openAddPatientDialog(day, talon) {
        return $mdDialog.show({
            controller: AddPatientController,
            template: appPatientTemplate,
            clickOutsideToClose: true,
            fullscreen: true,
            locals: {
                talon: talon,
                day: day
            }
        });
    }

    function saveCalendar(response) {
        if (response) {
            vm.calendars = response.months;
            vm.selectedMonth = vm.calendars[0];
            vm.schedule = response.schedule;
            vm.monthsForSchedule = vm.calendars.map(c => c.month).map(m => {
                return {
                    text: _.startCase(moment().month(m).format("MMMM")),
                    id: m
                }
            });
            vm.selectedMonthId = vm.monthsForSchedule[0];
            $scope.$broadcast('update', vm.selectedMonth);
        }
    }
}