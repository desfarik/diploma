export default function ToastController($mdToast, text, page, $scope, $state) {
    let vm = $scope;

    vm.text = text;
    vm.page = page;

    vm.goToPage = () => {
        $mdToast.hide();
        $state.go(page);
    };

    vm.closeToast = () => {
        $mdToast.hide()
    }
}