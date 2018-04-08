import template from './footer.html'
require('./footer.scss');

export default function FooterDirective($translate) {
    return {
        restrict: 'E',
        template,
        link: (scope) => {
            scope.changeLocale = (locale) => {
                $translate.use(locale);
                moment.locale(locale)
            }
        }
    };
};
