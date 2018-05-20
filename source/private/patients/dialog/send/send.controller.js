require('./send.scss');

export default function SendDialogController($scope, $mdDialog, element) {

    $scope.cancel = $mdDialog.cancel;
    $scope.tablets = [];

    $scope.name = '';
    $scope.interval = '';
    $scope.period = '';
    $scope.amount = '';
    $scope.description = '';
    $scope.element = element;

    $scope.addTablet = (form) => {
        $scope.tablets.push(createNewTablet());
        $scope.name = '';
        $scope.interval = '';
        $scope.period = '';
        $scope.amount = '';
        form.$$controls.forEach(element => {
            element.$dirty = false;
            element.$touched = false;
            element.$valid = true;
        });
    };

    $scope.removeTablet = (tablet) => {
        $scope.tablets = $scope.tablets.filter(item => !equal(tablet, item))
    };

    $scope.save = () => {
        if (!_.isEmpty($scope.tablets)) {
            let message = $scope.tablets.map(tablet => `${tablet.name} ${tablet.amount}, ${tablet.interval}, ${tablet.period}`).join("\n");
            element.history.push({
                text: `Назначено к применению: \n${message}`,
                date: moment().format("MM/DD/YY, LT"),
                id: new Date()
            });
        }
        $mdDialog.hide(JSON.stringify({
            text: $scope.description,
            tablets: $scope.tablets
        }));
    };

    function equal(v1, v2) {
        return v1.id === v2.id;
    }

    function createNewTablet() {
        return {
            "name": $scope.name,
            "interval": $scope.interval,
            "amount": $scope.amount,
            "period": $scope.period,
            "id": new Date()
        }
    }
}