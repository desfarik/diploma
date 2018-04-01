import privateModule from "./private/private.module";
import translatesModule from "./locale/translate.module";
import mainController from "./main.controller";

require('./main.scss');


angular.module('app', ['ngMaterial', 'ui.router', privateModule, translatesModule])
    .controller("ctrl", mainController)
    .config(function ($locationProvider) {
        // $locationProvider.html5Mode({enabled: true, requireBase: true}).hashPrefix('!');
    });




