import template from './header.html'

require('./header.scss');

export default function HeaderDirective($mdSidenav) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.openLeftMenu = () => $mdSidenav('right').toggle();

            scope.isOpenMenu = () => $mdSidenav('right').isOpen()
        }
    };
};
