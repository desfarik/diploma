export default function MainController($state, $rootScope, $http) {
    let vm = this;
    console.log(moment().format("MMMM"));


    $rootScope.$on('$stateChangeSuccess',
        (event, toState) => {
            if (localStorage.token || isPublicState($state.current)) {

                if (isPublicState(toState) && localStorage.token) {
                    event.preventDefault();
                    $state.go('home');
                }
            }
            else {
                event.preventDefault();
                $state.go("login");
            }
        });

    const isPublicState = (state) => state.data && state.data.publicState;
}