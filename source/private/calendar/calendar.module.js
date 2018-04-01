import calendarRouter from "./calendar.router";

require('./calendar.scss');

export default angular.module('private.calendar', [])
    .config(calendarRouter)
    .name;