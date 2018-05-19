import chatsRouter from "./chats.router";
import nameDirective from "./directive/name/name.directive";

require('./chats.scss');

export default angular.module('private.chats', [])
    .config(chatsRouter)
    .directive("maName",nameDirective)
    .name;