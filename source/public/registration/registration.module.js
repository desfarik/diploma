import registrationRouter from "./registration.router";
import registrationController from "./registration.controller";

require('./registration.scss');

export default angular.module('private.registration', [])
    .config(registrationRouter)
    .controller('RegistrationController', registrationController)
    .name;