import template from './header.html'

require('./header.scss');

export default function HeaderDirective($mdSidenav, $state) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.openLeftMenu = () => $mdSidenav('right').toggle();

            scope.isOpenMenu = () => $mdSidenav('right').isOpen();
            console.log($state);

            scope.isPublicState = ()=> $state.current.data && $state.current.data.publicState;
        }
    };
};
