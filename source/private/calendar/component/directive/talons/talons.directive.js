import template from './talons.html'

require('./talons.scss');

export default function TalonsDirective($state) {
    return {
        restrict: 'E',
        scope: {
            day: '=maDay',
            month: '=maMonth'
        },
        template,
        link: (scope) => {
            scope.date = moment(`${getNumberMonth()}-${scope.day.number}`).format("D MMMM");
            scope.goToPatientOrAdd = (index, talon) => {
                if (talon.patient) {
                    $state.go('patients', {userId: talon.patient.id})
                } else {
                    scope.$emit("addPatient", {day: scope.day, index: index});
                }
            };

            function getNumberMonth() {
                return moment().month(scope.month.month).format("M")
            }
        }
    };
};
