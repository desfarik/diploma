export default function ChatsController($stateParams,Upload, $translate, $mdDialog, $state) {
    let vm = this;
    const ENTER = "Enter";

    vm.messages = [{patient: true, message: "bla"},
        {patient: true, message: "bla"},
        {patient: true, message: "bla"},
        {patient: true, message: "bla"},
        {patient: true, message: "bla"},
        {patient: true, message: "bla"},
        {patient: true, message: "bla"},];

    vm.hasMessage = [1, 5, 7];
    vm.textArea = document.getElementById("textArea");
    vm.textArea.addEventListener('keyup', (event) => {
        if (event.key === ENTER && !event.shiftKey && !event.ctrlKey) {
            vm.send();
        }
    });

    console.log($stateParams);

    vm.go = (userId) => {
        vm.selecteDialog = userId;
        vm.messages = [];
    };

    vm.send = () => {
        if (getValue()) {
            vm.messages.push(createMessage());
            angular.element(vm.textArea)[0].value = '';
            document.getElementById("send").click();
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight);
        }
    };

    function createMessage() {
        return {patient: false, message: getValue()}
    }

    function getValue() {
        return angular.element(vm.textArea)[0].value.slice(0, -1);
    }
}