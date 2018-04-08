import template from './talons.html'
require('./talons.scss');

export default function TalonsDirective() {
    return {
        restrict: 'E',
        scope: {
            day: '=maDay',
            month: '=maMonth'
        },
        template,
        link: (scope)=> {
            scope.date = moment(`${getNumberMonth()}-${scope.day.number}`).format("D MMMM");

            function getNumberMonth() {
                return moment().month(scope.month).format("M")
            }
        }
    };
};
