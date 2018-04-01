import template from './menu.html'

require('./menu.scss');

export default function MenuDirective($mdSidenav) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.items = [
                {translate: 'home', icon: "home", href: "home"},
                {translate: 'calendar', icon: "date_range", href: "calendar"},
                {translate: 'patients', icon: "people", href: "home"}];

            scope.openLeftMenu = () => $mdSidenav('right').toggle();

            scope.isOpenMenu = () => $mdSidenav('right').isOpen()
        }
    };
};
