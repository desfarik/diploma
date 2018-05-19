export default function PersonAreaController(Upload, $translate, $mdDialog) {
    let vm = this;

    vm.file = null;
    vm.image = null;
    vm.name = null;
    vm.secondName = null;
    vm.phone = null;
    vm.address = null;
    vm.position = null;


    vm.details = [vm.image, vm.name = null, vm.secondName, vm.phone, vm.address, vm.position];

    vm.select = (file, form) => {
        console.log(form);
        if (form.$valid) {
            Upload.base64DataUrl(vm.file).then(image => {
                if (image) {
                    vm.image = image
                }
            });
        }
    };

    vm.save = () => {
        vm.loading = new Promise(resolve => setTimeout(() => resolve(), 1000));

       /* $translate('private.person.success_save').then(text =>
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent(text)
                    .ok('OK')
            )
        )*/
    }

}