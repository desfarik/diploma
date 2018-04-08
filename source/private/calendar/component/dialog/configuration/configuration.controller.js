require('./configuration.scss');

export default function ConfigurationDialogController($scope, $mdDialog) {
    let vm = this;

    $scope.cancel = $mdDialog.cancel;
    $scope.configuratonTypes = ['2-to-2', '2-to-3', '5-to-2', '6-to-1', '7'];
    $scope.selectedType =  $scope.configuratonTypes[0];

    $scope.selectType = (type) => $scope.selectedType = type;

}