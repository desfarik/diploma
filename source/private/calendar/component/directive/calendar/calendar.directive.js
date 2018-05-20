import template from './calendar.template.html'
require('./calendar.scss');

export default function CalendarDirective() {
    return {
        restrict: 'E',
        template,
        controller: "CalendarDirectiveController",
        controllerAs: "vm",
        bindToController: true
    };
};
