import loginRouter from "./login.router";
import loginController from "./login.controller";

export default angular.module('public.login', [])
    .config(loginRouter)
    .controller('LoginController', loginController)
    .name;