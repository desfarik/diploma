import template from "./reset.html"
import resetController from "./reset.controller";

export default function PrivateRouter($stateProvider) {
    return $stateProvider.state({
        name: 'reset',
        url: '/reset',
        template,
        controller: resetController,
        controllerAs: "reset",
        bindToController: true,
        data: {
            publicState: true
        }
    })
}