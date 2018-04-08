export default function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(($injector, $location) => {
        $location.path('/')
    });
}