import template from './day.html'

require('./day.scss');

export default function DayDirective(DayService) {
    return {
        restrict: 'E',
        scope: {
            day: '=maDay',
            month: '=maMonth',
        },
        template,
        link: (scope) => {
            scope.isDayOff = DayService.isDayOff;
            scope.isToday =  DayService.isToday;
        }
    };
};
