import template from './menu.html'

require('./menu.scss');

export default function MenuDirective($mdSidenav, $state, TokenService, ToastService) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.items = [
                {translate: 'home', icon: "home", href: "home"},
                {translate: 'person', icon: "person", href: "person"},
                {translate: 'chats', icon: "message", href: "chats"},
                {translate: 'calendar', icon: "date_range", href: "calendar"},
                {translate: 'patients', icon: "people", href: "patients"}];

            scope.closeMenu = (state) => {
                $mdSidenav('right').toggle();
                $state.go(state, {userId: 123});
            };

            scope.logout = () => {
                TokenService.clear();
                ToastService.stop();
                $mdSidenav('right').toggle();
                $state.go('login');
            }
        }
    };
};
