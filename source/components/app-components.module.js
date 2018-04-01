import headerDirective from '../components/header/header.directive';

export default angular.module('appComponents', [])
    .directive('ntHeader', headerDirective)
    .name;