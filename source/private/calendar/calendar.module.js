import calendarRouter from "./calendar.router";
import calendarDirective from "./component/directive/calendar/calendar.directive"
import CalendarDirectiveController from "./component/directive/calendar/calendar.directive.controller"
import DayDirective from "./component/directive/day/day.directive";
import TalonsDirective from "./component/directive/talons/talons.directive";
import dayService from "./component/service/day.service";

require('./calendar.scss');

export default angular.module('private.calendar', [])
    .config(calendarRouter)
    .directive("maCalendar", calendarDirective)
    .directive("maDay", DayDirective)
    .directive("maTalons", TalonsDirective)
    .service("DayService", dayService)
    .controller("CalendarDirectiveController", CalendarDirectiveController)
    .name;