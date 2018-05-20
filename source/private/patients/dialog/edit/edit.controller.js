require('./edit.scss');

export default function EditDialogController($scope, $mdDialog, history, view) {

    $scope.cancel = $mdDialog.cancel;
    $scope.symptoms = '';
    $scope.EDIT_MODE = false;
    $scope.editMessage = null;
    $scope.history = history;
    $scope.diag = history.diag;
    $scope.view = view;

    $scope.editDiag = () => {
        if ($scope.diag) {
            $scope.history.history.push({
                text: `Диагноз сменен на ${$scope.diag}`,
                date: moment().format("LT, MM/DD/YY"),
                id: new Date()
            });
        }
    };

    $scope.addSymptoms = () => {
        if ($scope.symptoms) {
            if ($scope.EDIT_MODE) {
                $scope.history.history.find(element => element.id === $scope.editMessage.id).text = $scope.symptoms;
                $scope.EDIT_MODE = false;
            } else {
                $scope.history.history.push({
                    text: $scope.symptoms,
                    date: moment().format("LT, MM/DD/YY"),
                    id: new Date()
                });
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
        $scope.history.history = $scope.history.history.filter(item => message.id !== item.id);
    };

    $scope.save = () => {
        $mdDialog.hide($scope.history);
    }

}