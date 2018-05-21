import chatsRouter from "./chats.router";
import nameDirective from "./directive/name/name.directive";
import DialogService from "./service/dialog.service";

require('./chats.scss');

export default angular.module('private.chats', [])
    .config(chatsRouter)
    .directive("maName",nameDirective)
    .service("DialogService",DialogService)
    .name;