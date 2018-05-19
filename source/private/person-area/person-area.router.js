import template from "./person-area.html"
import personController from "./person-area.controller";

export default function PersonAreaRouter($stateProvider) {
    return $stateProvider.state({
        name: 'person',
        url: '/person',
        template,
        controller: personController,
        controllerAs: "profile",
        bindToController: true
    })
}