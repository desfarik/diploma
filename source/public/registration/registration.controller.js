export default function RegistrationController(PublicHttpService, $state) {

    let vm = this;

    vm.login = '';
    vm.password1 = '';
    vm.password2 = '';
    vm.smsSended = false;
    vm.phone = '';
    vm.key = '';

    vm.processUserInfo = () => {
        verifyPasswords();
        if (vm.form.$valid) {
            PublicHttpService.register(vm.login, vm.password1, vm.phone, vm.key).then(successProcess, errorProcess);
        } else {
            invalidateForm()
        }
    };

    function verifyPasswords() {
        if (vm.password1 !== vm.password2) {
            vm.form.password1.$setValidity("repeatingPassword", false);
            vm.form.password2.$setValidity("repeatingPassword", false);
        }
    }

    function invalidateForm() {
        vm.form.$$controls.forEach(element => element.$touched = true);
    }

    function successProcess() {
        $state.go('login');
    }

    function errorProcess(error) {
        if (error.status === 408) {
            vm.form.login.$setValidity("wrongLogin", false);
        }
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
            PublicHttpService.sendSms(vm.phone)
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