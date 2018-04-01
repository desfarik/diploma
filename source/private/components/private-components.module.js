import headerDirective from './directive/header/header.directive';
import footerDirective from './directive/footer/footer.directive';
import menuDirective from './directive/menu/menu.directive';

export default angular.module('appComponents', [])
    .directive('maHeader', headerDirective)
    .directive('maFooter', footerDirective)
    .directive('maMenu', menuDirective)
    .name;