export default function LoginController(PublicHttpService, $state, TokenService) {
    let vm = this;

    vm.login = 'desfarik';
    vm.password = '123123123';

    vm.processUserInfo = (form) => {
        //form.login.$setValidity('wrongLogin', false);
        if (form.$valid) {
            PublicHttpService.login(vm.login, vm.password).then((response) => {
                TokenService.save(response.headers("Authorization"));
                $state.go('home');
            }, response => {
                // console.log(response.headers("Authorization"));
            })
        } else {
            invalidateForm(form)
        }
    };

    function invalidateForm(form) {
        form.$$controls.forEach(element => element.$touched = true)
    }

}