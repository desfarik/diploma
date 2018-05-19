import template from "./patients.html"
import patientsController from "./patients.controller";

export default function PersonAreaRouter($stateProvider) {
    return $stateProvider.state({
        name: 'patients',
        url: '/patients',
        template,
        controller: patientsController,
        controllerAs: "patients",
        bindToController: true,
        params:{
            userId: null
        }
    })
}