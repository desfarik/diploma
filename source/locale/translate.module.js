import ruLocale from "./ru.json";
import enLocale from "./en.json";

export default angular.module('translate', ['pascalprecht.translate'])
    .config(['$translateProvider', ($translateProvider) => {
        $translateProvider.translations('ru', ruLocale);
        $translateProvider.translations('en', enLocale);
        $translateProvider.preferredLanguage('ru');
    }])
    .name