import template from "../directive/toast/toast.html";

export default function ToastService($interval, $mdToast, $http, $rootScope) {

    let stopTime;
    this.start = () => {
        stopTime = $interval(this.check, 5000);
    };

    this.stop = () => $interval.cancel(stopTime);

    this.check = () => {
        $http.get('api/toast/check/' + JSON.stringify(getLastUpdateDate()))
            .then(response => {
                console.log(response);
                if (response.data.data === "chat") {
                    $rootScope.$broadcast("updateMessages");
                    showToast("chats");
                    this.stop();
                }
                if (response.data.data === "calendar") {
                    showToast("calendar");
                    this.stop();
                }
            })
    };

    function showToast(page) {
        $mdToast.show({
            hideDelay: 0,
            position: 'bottom right',
            controller: 'ToastController',
            template: template,
            locals: {page: page}
        });
    }


    function getLastUpdateDate() {
        let date = localStorage.getItem('lastUpdateCalendar');
        return date !== "undefined" && !!date ? JSON.parse(date) : new Date();
    }

}