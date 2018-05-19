require('./edit.scss');

export default function EditDialogController($scope, $mdDialog, diag) {

    $scope.cancel = $mdDialog.cancel;
    $scope.history = [];
    $scope.symptoms = '';
    $scope.EDIT_MODE = false;
    $scope.editMessage = null;
    $scope.diag = diag;

    $scope.editDiag = () => {
        if($scope.diag) {
            $scope.history.push({text: `Диагноз сменен на ${$scope.diag}`, date: moment().format("LT, MM/DD/YY"), id: new Date()});
        }
    };

    $scope.addSymptoms = () => {
        if ($scope.symptoms) {
            if ($scope.EDIT_MODE) {
                $scope.history.find(element => element.id === $scope.editMessage.id).text = $scope.symptoms;
                $scope.EDIT_MODE = false;
            } else {
                console.log($scope.symptoms);
                $scope.history.push({text: $scope.symptoms, date: moment().format("LT, MM/DD/YY"), id: new Date()});
            }
            $scope.symptoms = '';
        }
    };

    $scope.editText = (message) => {
        $scope.EDIT_MODE = true;
        $scope.editMessage = message;
        $scope.symptoms = message.text;
    };

    $scope.deleteText = (message) => {
        $scope.history = $scope.history.filter(item => message.id !== item.id);
    };

}