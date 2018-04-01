export default function MainController($state, $rootScope) {
    let vm = this;
    console.log($rootScope);

    $state.go('home');

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            console.log(toState);
        })


}