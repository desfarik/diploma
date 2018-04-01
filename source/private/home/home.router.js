import template from "./home.html"
import homeController from "./home.controller";

export default function PrivateRouter($stateProvider) {
    return $stateProvider.state({
        name: 'home',
        url: '/',
        template,
        controller: homeController
    })
}