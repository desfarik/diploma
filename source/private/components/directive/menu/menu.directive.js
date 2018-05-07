import template from './menu.html'

require('./menu.scss');

export default function MenuDirective($mdSidenav, $state, TokenService) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.items = [
                {translate: 'home', icon: "home", href: "home"},
                {translate: 'calendar', icon: "date_range", href: "calendar"},
                {translate: 'patients', icon: "people", href: "home"}];

            scope.closeMenu = (state) => {
                $mdSidenav('right').toggle();
                $state.go(state);
            };

            scope.logout = ()=> {
                TokenService.clear();
                $mdSidenav('right').toggle();
                $state.go('login');
            }
        }
    };
};
