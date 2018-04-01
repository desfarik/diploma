import template from "./private.html"
import privateController from "./private.controller";

export default function PrivateRouter($stateProvider) {
    return $stateProvider.state('private', {
        template,
        controller: privateController
    })
}