import patientsRouter from "./patients.router";
import SendDialogController from "./dialog/send/send.controller";
import EditDialogController from "./dialog/edit/edit.controller";


require('./patients.scss');

export default angular.module('private.patients', [])
    .config(patientsRouter)
    .controller('SendDialogController', SendDialogController)
    .controller('EditDialogController', EditDialogController)
    .name;