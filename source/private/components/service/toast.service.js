import template from "../directive/toast/toast.html";

export default function ToastService($interval, $mdToast) {

    let interval;
    this.start = () => {
        showToast();
/*        interval = $interval(showToast, 5000);*/
    };

    this.stop = () => interval();

    function showToast() {
        $mdToast.show({
            hideDelay: 0,
            position: 'bottom right',
            controller: 'ToastController',
            template: template,
            locals: {text: "chats", page: "chats"}
        });
    }

}