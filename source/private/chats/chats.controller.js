export default function ChatsController($stateParams, DialogService, $scope) {
    let vm = this;
    const ENTER = "Enter";
    let MAX_LAST_MESSAGE;

    vm.textArea = document.getElementById("textArea");
    vm.textArea.addEventListener('keyup', (event) => {
        if (event.key === ENTER && !event.shiftKey && !event.ctrlKey) {
            vm.send();
        }
    });

    vm.selectPatient = (patient) => {
        vm.selectedPatient = patient;
        patient.hasMessage = false;
        loadMessages(patient.id);
    };

    $scope.$on('updateMessages', () => init(false));

    init();


    function init(first = true) {
        vm.loading = DialogService.getPatients().then(patients => {
            vm.patients = _.sortBy(patients, 'lastMessage').reverse();
            if (first) {
                vm.selectedPatient = vm.patients.filter(p => p.id === $stateParams.userId)[0] || vm.patients[0];
                vm.selectedPatient.hasMessage = false;
            }
            MAX_LAST_MESSAGE = vm.patients[0].lastMessage;
            loadMessages(vm.selectedPatient.id);
        });
    }

    vm.getDisplayPatient = (patient) => {
        if (patient && patient.details) {
            return patient.details.name + ' ' + patient.details.secondName;
        }
    };

    vm.getPatients = () => _.sortBy(vm.patients, 'lastMessage').reverse();

    vm.send = () => {
        if (getValue()) {
            const message = createMessage();
            vm.messages.push(message);
            vm.selectedPatient.lastMessage = ++MAX_LAST_MESSAGE;
            DialogService.sendMessage(message);
            angular.element(vm.textArea)[0].value = '';
            document.getElementById("send").click();
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight);
        }
    };

    function loadMessages(patientId) {
        return DialogService.getMessages(patientId)
            .then(response => {
                vm.messages = response.data || [];

            })
    }

    function createMessage() {
        return {userId: vm.selectedPatient.id, data: getValue(), doctor: true}
    }

    function getValue() {
        return angular.element(vm.textArea)[0].value.slice(0, -1);
    }
}