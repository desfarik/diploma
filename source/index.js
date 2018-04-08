import privateModule from "./private/private.module";
import translatesModule from "./locale/translate.module";
import mainController from "./main.controller";
import routeConfig from "./config/route.config";

require('./main.scss');


angular.module('app', ['ngMaterial', 'ui.router', 'ngAnimate', privateModule, translatesModule])
    .controller("ctrl", mainController)
    .config(routeConfig);




