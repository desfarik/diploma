import template from "./calendar.html"
import calendarController from "./calendar.controller";

export default function CalendarRouter($stateProvider) {
    return $stateProvider.state({
        name: 'calendar',
        url: '/calendar',
        template,
        controller: calendarController,
        controllerAs: "calendar",
        bindToController: true
    })
}