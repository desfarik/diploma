import template from "./login.html"
import loginController from "./login.controller";

export default function PrivateRouter($stateProvider) {
    return $stateProvider.state({
        name: 'login',
        url: '/login',
        template,
        controller: loginController,
        controllerAs: "login",
        bindToController: true,
        data: {
            publicState: true
        }
    })
}