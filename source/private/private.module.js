import privateComponents from "./components/private-components.module";
import calendarModule from "./calendar/calendar.module";
import homeModule from "./home/home.module";

export default angular.module('private', ['ngMessages', privateComponents, calendarModule, homeModule])
    .name;