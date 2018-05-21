export default function DialogService($http, UserService) {

    this.getMessages = (patient) => $http.get('api/chat/messages/get/' + patient);

    this.getPatients = () => $http.get('api/chat/messages/users').then(response => {
        let users = response.data;
        return UserService.getPatients()
            .then(patients => {
                users.forEach(user => {
                    let patient = patients.find(p => p.id === user.userId);
                    patient.lastMessage = user.lastMessage;
                    patient.hasMessage = user.hasMessage;
                });
                patients.forEach(p => p.lastMessage ? '' : p.lastMessage = 0);
                return patients;
            })
    });

    this.sendMessage = (message) => $http.post('api/chat/messages/send', {
        userId: message.userId,
        data: message.data,
    });
}