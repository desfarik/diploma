import SendDialogController from "./dialog/send/send.controller";
import sendTemplate from "./dialog/send/send.html";
import EditdDialogController from "./dialog/edit/edit.controller";
import editTemplate from "./dialog/edit/edit.html";

export default function PatientsController($mdDialog, $translate, $state) {
    let vm = this;

    vm.go = (userId) => {
        vm.selecteDialog = userId;
    };
    vm.selectedPatientHistory = [1, 2, 3, 4, 5, 6, 7, 8];

    vm.addPatient = () => {
        $translate(['private.patients.dialog.patient.title', 'private.patients.dialog.patient.code', 'private.patients.dialog.patient.code_placeholder', 'private.patients.dialog.patient.add'])
            .then(translates => openAddingDialog(_.values(translates)))
            .then(() =>
                    $translate('private.patients.dialog.success').then(showResultDialog),
                () =>
                    $translate('private.patients.dialog.error').then(showResultDialog));
    };

    vm.addHistoryElement = () => {
        $translate(['private.patients.dialog.history.title', 'private.patients.dialog.history.fake', 'private.patients.dialog.history.code_placeholder', 'private.patients.dialog.history.add'])
            .then(translates => openAddingDialog(_.values(translates)))
            .then(addToHistory, errorNothing);
    };

    vm.finishHistoryElement = (element) => {
        vm.loading = new Promise(resolve => setTimeout(() => resolve(), 1000));
/*        $translate('private.patients.dialog.remove.title')
            .then(openRemovingDialog)*/
    };

    vm.openSendDialog = (diag) => $mdDialog.show({
        controller: SendDialogController,
        template: sendTemplate,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {diag: diag}
    });

    vm.openEditDialog = (diag) => $mdDialog.show({
        controller: EditdDialogController,
        template: editTemplate,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {diag: diag}
    });

    vm.goToCalendar = () => {
        $state.go("calendar");
    };

    vm.goToChat = () => {
        $state.go("chats", {userId: vm.selecteDialog});
    };

    function openAddingDialog(translates) {
        let confirm = $mdDialog.prompt()
            .title(translates[0])
            .textContent(translates[1])
            .placeholder(translates[2])
            .clickOutsideToClose(true)
            .ok(translates[3]);

        return $mdDialog.show(confirm);
    }

    function openRemovingDialog(translates) {
        let confirm = $mdDialog.confirm()
            .title(translates)
            .ok('Да')
            .cancel('Нет');

        return $mdDialog.show(confirm);
    }

    function showResultDialog(text) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .textContent(text)
                .ok('OK')
        );
    }

    function addToHistory(newElement) {
        vm.selectedPatientHistory.push(newElement);
    }

    function errorNothing() {
        //nothing
    }

}