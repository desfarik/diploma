import days from "../../directive/calendar/days";

require('./configuration.scss');
import workDayTypes from './day-work-types';

export default function ConfigurationDialogController($scope, $mdDialog) {
    $scope.cancel = $mdDialog.cancel;
    $scope.configuratonTypes = workDayTypes;
    $scope.selectType = selectType;
    $scope.pattern = /\d{1,2}:\d{2}/;
    init();

    function init() {
        selectType($scope.configuratonTypes[0])
    }

    function selectType(type) {
        $scope.selectedType = type;
        initDays(type);
    }

    function initDays(type) {
        let workDays = [...Array(type.workDays).keys()].map(()=>createDayObject(false));
        let daysOff = [...Array(type.daysOff).keys()].map(() => createDayObject(true));
        $scope.workDays = [...workDays, ...daysOff];
    }

    function createDayObject(dayOff = false) {
        return {
            workTimeStart: "",
            workTimeEnd: "",
            dayOff: dayOff
        }
    }

}