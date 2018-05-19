import privateComponents from "./components/private-components.module";
import calendarModule from "./calendar/calendar.module";
import homeModule from "./home/home.module";
import personModule from "./person-area/person-area.module";
import chatsModule from "./chats/chats.module";
import patientsModule from "./patients/patients.module";
import ToastService from "./components/service/toast.service";

export default angular.module('private', ['ngMessages', privateComponents, calendarModule, homeModule, personModule, chatsModule, patientsModule])
    .service('ToastService', ToastService)
    .name;