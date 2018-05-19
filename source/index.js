import privateModule from "./private/private.module";
import publicModule from "./public/public.module";
import translatesModule from "./locale/translate.module";
import mainController from "./main.controller";
import routeConfig from "./config/route.config";
import applicationProperties from "./config/application.properties"
import themeConfig from "./config/theme.config"
import tokenService from "./components/service/token.service";
import template from "./cg-busy.template.html";

require('./main.scss');


angular.module('app', ['ngMaterial', 'ui.router', 'ngAnimate', 'ngFileUpload', 'cgBusy', privateModule, translatesModule, publicModule])
    .controller("ctrl", mainController)
    .service('TokenService', tokenService)
    .constant("appConfig", applicationProperties)
    .config(routeConfig)
    .run(function($templateCache) {
        $templateCache.put('cg-busy.template.html', template);
    })
    .value('cgBusyDefaults',{
        backdrop: true,
        templateUrl: 'cg-busy.template.html',
        delay: 100,
        minDuration: 1000,
        wrapperClass: 'cg-busy'})
    .config(themeConfig);




