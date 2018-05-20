require('./add-patient.scss');

export default function AddPatientController($scope, $mdDialog, UserService, talon, day) {
    $scope.cancel = $mdDialog.cancel;
    UserService.getPatients().then(patients => {
        $scope.patients = patients.map(p => {
            p.display = getDisplayPatient(p);
            return p;
        });
    });

    $scope.talonDisplay = " " + day + ' ' + talon.time;

    function getDisplayPatient(patient) {
        return patient.details.name + ' ' + patient.details.secondName;
    }

    $scope.search = (text) => $scope.patients.filter(p => p.display.toLowerCase().includes(text.toLowerCase()));

    $scope.select =()=>{
        $mdDialog.hide($scope.selectedPatient)
    }
}