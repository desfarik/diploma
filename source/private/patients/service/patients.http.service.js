export default function PatientsService($http) {

    this.getHistory = (patient) => $http.get('api/patients/history/get/' + patient);

    this.saveHistory = (patient, history) => $http.post('api/patients/history/save/', {
        patientId: patient,
        data: history
    });

    this.getProgress = (patient) => $http.get('api/patients/progress/get/' + patient);

    this.sendToMobile = (patient, data) => $http.post('api/patients/mobile/send', {
        patientId: patient,
        data: data,
        send: false
    });
}