import headerDirective from './directive/header/header.directive';
import footerDirective from './directive/footer/footer.directive';
import menuDirective from './directive/menu/menu.directive';
import toastController from './directive/toast/toast.controller';

require("./directive/toast/toast.scss");

export default angular.module('appComponents', [])
    .directive('maHeader', headerDirective)
    .directive('maFooter', footerDirective)
    .directive('maMenu', menuDirective)
    .controller('ToastController', toastController)
    .name;