import template from './name.html'

require('./name.scss');
const COLORS = ['green-color', 'green-color-2', 'teal', 'cyan', 'light-blue', 'blue', 'indigo', 'purple'];
export default function NameDirective() {
    return {
        restrict: 'E',
        scope: {
            patient: '=maPatient'
        },
        link: (scope, element) => {
            element[0].firstChild.classList.add(getRandomColor());
        },
        template,
    };

    function getRandomColor() {
        return COLORS[parseInt(Math.random() * (8))];
    }
};
