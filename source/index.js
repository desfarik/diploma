import privateModule from "./private/private.module";
import translatesModule from "./locale/translate.module";

angular.module('app', ['ngMaterial', 'ui.router', privateModule, translatesModule])
    .controller("ctrl", $state => $state.go('private'));

