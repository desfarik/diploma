export default function UserService($http) {

    this.getPatients = () => {
        if (localStorage.patients) {
            return new Promise(resolve => resolve(JSON.parse(localStorage.patients)));
        } else {
            $http.get('api/patients/get').then(response => {
                let patient = response.data.map(p => {
                    p.details = JSON.parse(p.details);
                    return p;
                });
                localStorage.patients = JSON.stringify(patient);
                return patient;
            })
        }
    }
}