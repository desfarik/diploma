require('./send.scss');

export default function SendDialogController($scope, $mdDialog, diag) {

    $scope.cancel = $mdDialog.cancel;
    $scope.tablets = [];

    $scope.name = '';
    $scope.interval = '';
    $scope.period = '';
    $scope.amount = '';
    $scope.description = '';
    $scope.diag = diag;

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