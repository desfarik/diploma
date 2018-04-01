import headerDirective from './directive/header/header.directive';
import footerDirective from './directive/footer/footer.directive';

export default angular.module('appComponents', [])
    .directive('maHeader', headerDirective)
    .directive('maFooter', footerDirective)
    .name;