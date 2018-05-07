import resetRouter from "./reset.router";
import resetController from "./reset.controller";

export default angular.module('private.reset', [])
    .config(resetRouter)
    .controller('ResetController', resetController)
    .name;