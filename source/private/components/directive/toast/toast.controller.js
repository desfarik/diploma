export default function ToastController($mdToast, page, $scope, $state, ToastService) {
    let vm = $scope;

    vm.page = page;

    vm.goToPage = () => {
        ToastService.start();
        $mdToast.hide();
        $state.go(page, {}, {reload: true});
    };

    vm.closeToast = () => {
        ToastService.start();
        $mdToast.hide();
    }
}