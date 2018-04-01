import template from "./private.html"
import mainController from "./private.controller";

export default function MainRouter($stateProvider) {
    return $stateProvider.state('private', {
        template,
        controller: mainController,
    })
}