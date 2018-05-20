import days from "../../directive/calendar/days";

require('./configuration.scss');
import workDayTypes from './day-work-types';

export default function ConfigurationDialogController($scope, $mdDialog) {
    $scope.cancel = $mdDialog.cancel;
    $scope.configuratonTypes = workDayTypes;
    $scope.selectType = selectType;
    $scope.pattern = /\d{1,2}:\d{2}/;
    init();

    $scope.typesTimeReception = [5, 10, 15, 20, 25, 30, 45, 60, 90, 120];
    $scope.selectedTimeReception = $scope.typesTimeReception[1];

    $scope.save = (form) => {
        if (form.$valid) {
            $mdDialog.hide({months: generateMonths(), schedule: generateSchedule()});
        } else {
            form.$$controls.forEach(element => element.$touched = true);
        }
    };

    function generateSchedule() {
        return {
            workDays: $scope.workDays.map((d, i) => {
                d.text = `День ${i + 1}: ${d.workTimeStart}-${d.workTimeEnd};`;
                return d;
            }).filter(d => !d.dayOff).map(d => d.text),
            dayOff: $scope.workDays.map((d, i) => {
                d.text = `День ${i + 1}`;
                return d;
            }).filter(d => d.dayOff).map(d => d.text).join(", ") + ": выходные;"
        }
    }

    function generateMonths() {
        let months = [...Array(3).keys()].map(e => moment().month() + e);
        return months.map(e => generateMonth(e, transformDays()));
    }

    function generateMonth(month, days) {
        return {
            month: month,
            days: generateDays(moment().month(month).daysInMonth(), days)
        }
    }

    function generateDays(count, days) {
        $scope.number = 1;
        return _.flatten(_.times((count / days.length) + 1, () => days)).splice(0, count);
    }

    function transformDays() {
        return $scope.workDays.map(day => {
            return {
                day_off: day.dayOff,
                talons: generateTalons(day)
            }
        });
    }

    function generateTalons(workDay) {
        let count = parseInt((getTime(workDay.workTimeEnd) - getTime(workDay.workTimeStart)) / $scope.selectedTimeReception);
        return [...Array(count)].map((e, i) => {
            return {
                time: moment(moment(`11.11.11 ${workDay.workTimeStart}`) + 60000 * $scope.selectedTimeReception * i).format("LT"),
                patient: null
            }
        });
    }

    function getTime(time) {
        time = time.split('');
        let minutes = _.toNumber(time.splice(-2).join(''));
        time.splice(-1);
        let hours = _.toNumber(time.join(''));
        return hours * 60 + minutes;
    }

    function init() {
        selectType($scope.configuratonTypes[0])
    }

    function selectType(type) {
        $scope.selectedType = type;
        initDays(type);
    }

    function initDays(type) {
        let workDays = [...Array(type.workDays).keys()].map(() => createDayObject(false));
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