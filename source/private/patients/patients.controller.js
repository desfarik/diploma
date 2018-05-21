import SendDialogController from "./dialog/send/send.controller";
import sendTemplate from "./dialog/send/send.html";
import EditDialogController from "./dialog/edit/edit.controller";
import editTemplate from "./dialog/edit/edit.html";

export default function PatientsController($mdDialog, $translate, $state, UserService, $stateParams, PatientsService) {
    let vm = this;

    vm.selectPatient = (patient) => {
        vm.selectedPatient = patient;
        vm.history = [];
        loadHistory(patient.id);
    };

    vm.history = [];

    init();

    function init() {
        vm.loading = UserService.getPatients().then(patients => {
                vm.patients = patients;
                vm.selectedPatient = vm.patients.filter(p => p.id === $stateParams.userId)[0] || vm.patients[0];
                return vm.selectedPatient.id;
            }
        ).then(loadHistory);
    }

    function loadHistory(userId) {
        PatientsService.getHistory(userId).then(response => {
            if (response.data && response.data.data) {
                vm.history = JSON.parse(response.data.data);
                console.log(vm.history);
            }
        })
    }

    vm.goToChat = () => {
        $state.go("chats", {userId: vm.selectedPatient.id});
    };

    vm.getDisplayPatient = (patient) => {
        if (patient && patient.details) {
            return patient.details.name + ' ' + patient.details.secondName;
        }
    };

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
            .then(addToHistory, errorNothing)
            .then(saveHistory);
    };

    vm.finishHistoryElement = (element) => {
        $translate('private.patients.dialog.remove.title')
            .then(openRemovingDialog)
            .then(() => {
                element.active = false;
                element.lastDate = moment().format("D.MM.YYYY");
            })
            .then(saveHistory);
    };

    vm.openSendDialog = (element) => $mdDialog.show({
        controller: SendDialogController,
        template: sendTemplate,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {element: element}
    }).then((data) => PatientsService.sendToMobile(vm.selectedPatient.id, data))
        .then(saveHistory);

    vm.openEditDialog = (element) => {
        $mdDialog.show({
            controller: EditDialogController,
            template: editTemplate,
            clickOutsideToClose: true,
            fullscreen: true,
            locals: {
                history: element,
                view: false
            }
        }).then(saveHistory);
    };

    vm.openViewDialog = (element) => {
        $mdDialog.show({
            controller: EditDialogController,
            template: editTemplate,
            clickOutsideToClose: true,
            fullscreen: true,
            locals: {
                history: element,
                view: true
            }
        })
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
            .clickOutsideToClose(true)
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

    function addToHistory(firstDiag) {
        vm.history.push({
            id: new Date(),
            diag: firstDiag,
            firstDate: moment().format("D.MM.YYYY"),
            history: [{
                text: `Первоначальный диагноз - ${firstDiag}`,
                date: moment().format("LT, MM/DD/YY"),
                id: new Date()
            }],
            active: true
        });
    }

    function saveHistory() {
        PatientsService.saveHistory(vm.selectedPatient.id, JSON.stringify(vm.history));
    }

    vm.getDate = (element) => {
        if (element.active) {
            return element.firstDate + " - ...";
        } else {
            return element.firstDate + " - " + element.lastDate;
        }
    };

    function errorNothing() {
        //nothing
    }

}