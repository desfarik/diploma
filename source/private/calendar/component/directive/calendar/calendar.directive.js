import template from './calendar.template.html'
require('./calendar.scss');

export default function CalendarDirective() {
    return {
        restrict: 'E',
        template,
        scope:{
            month: '=maMonth'
        },
        controller: "CalendarDirectiveController",
        controllerAs: "vm",
        bindToController: true
    };
};
