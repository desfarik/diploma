export default function PersonAreaController(Upload, PersonAreaService, $mdDialog, $translate) {
    let vm = this;

    vm.file = null;
    vm.image = null;
    vm.name = null;
    vm.secondName = null;
    vm.phone = null;
    vm.address = null;
    vm.position = null;

    vm.loading = PersonAreaService.getUserDetails()
        .then(response => {
            if (response.data.details) {
                let details = JSON.parse(response.data.details);
                vm.image = details.image;
                vm.name = details.name;
                vm.secondName = details.secondName;
                vm.phone = details.phone;
                vm.address = details.address;
                vm.position = details.position;
                vm.details = [vm.image, vm.name, vm.secondName, vm.phone, vm.address, vm.position];
                console.log(vm.details);
            }
        });


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
        vm.loading = PersonAreaService.save(vm.image, vm.name, vm.secondName, vm.phone, vm.address, vm.position)
            .then(() => $translate('private.person.success_save'))
            .then(text => {
                    console.log(text);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .textContent(text)
                            .ok('OK')
                    )
                }
            );
    }

}