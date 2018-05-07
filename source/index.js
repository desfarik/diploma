import privateModule from "./private/private.module";
import publicModule from "./public/public.module";
import translatesModule from "./locale/translate.module";
import mainController from "./main.controller";
import routeConfig from "./config/route.config";
import applicationProperties from "./config/application.properties"
import themeConfig from "./config/theme.config"
import tokenService from "./components/service/token.service";

require('./main.scss');


angular.module('app', ['ngMaterial', 'ui.router', 'ngAnimate', privateModule, translatesModule, publicModule])
    .controller("ctrl", mainController)
    .service('TokenService', tokenService)
    .constant("appConfig", applicationProperties)
    .config(routeConfig)
    .config(themeConfig);




