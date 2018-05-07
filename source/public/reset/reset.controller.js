export default function ResetController(PublicHttpService, $state) {

    let vm = this;

    vm.password1 = '';
    vm.password2 = '';
    vm.smsSended = false;

    vm.processUserInfo = (form) => {
        verifyPasswords(form);
        if (form.$valid) {
            PublicHttpService.reset(vm.password1, vm.phone, vm.key).then(successProcess, errorProcess);
        } else {
            invalidateForm(form)
        }
    };

    function verifyPasswords(form) {
        if (vm.password1 !== vm.password2) {
            form.password1.$setValidity("repeatingPassword", false);
            form.password2.$setValidity("repeatingPassword", false);
        }
    }

    function invalidateForm(form) {
        form.$$controls.forEach(element => element.$touched = true);
    }

    function successProcess() {
        $state.go('login');
    }

    function errorProcess(error) {
        if(error.status === 409) {
            vm.form.phone.$setValidity("wrongPhone", false);
        }
        if(error.status === 410) {
            vm.form.key.$setValidity("wrongKey", false);
        }
    }

    vm.clearError = (element, error) => {
        element.$setValidity(error, true);
    };

    vm.sendSMS = (form) => {
        vm.form = form;
        if (vm.form.phone.$valid) {
            PublicHttpService.sendSms(vm.phone, true)
                .then(() => vm.smsSended = true,
                    processSmsError);
        }
    };

    function processSmsError(error) {
        if (error.status === 409) {
            vm.form.phone.$setValidity("wrongPhone", false);
        } else {
            vm.form.phone.$setValidity("fieldError", false);
        }
    }
}