import privateModule from "./private/private.module";

angular.module('app', ['ngMaterial', 'ui.router', privateModule])
    .controller("ctrl", $state => $state.go('private'));

