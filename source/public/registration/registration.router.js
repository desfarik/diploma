import template from "./registration.html"
import registrationController from "./registration.controller";

export default function PrivateRouter($stateProvider) {
    return $stateProvider.state({
        name: 'registration',
        url: '/registration',
        template,
        controller: registrationController,
        controllerAs: "registration",
        bindToController: true,
        data: {
            publicState: true
        }
    })
}