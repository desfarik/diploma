export default function CalendarHttpService($http) {

    this.getCalendars = () =>
        $http.post('api/calendar/check', {lastUpdate: getLastUpdateDate()})
            .then(response => {
                if (response.data) {
                    return JSON.parse(localStorage.calendar);
                }
                else {
                    return getCalendars();
                }
            });

    this.saveCalendars = (calendar, schedule) => $http.post('api/calendar/save', {
        data: JSON.stringify({months: calendar, schedule: schedule}),
        lastUpdate: getLastUpdateDate()
    }).then(response => {
        localStorage.calendar = JSON.stringify({months: calendar, schedule: schedule});
        localStorage.lastUpdateCalendar = JSON.stringify(response.data.data);
        return response;
    });

    function getLastUpdateDate() {
        let date = localStorage.getItem('lastUpdateCalendar');
        return date !== "undefined" && !!date ? JSON.parse(date) : new Date();
    }

    function getCalendars() {
        return $http.get('api/calendar/get').then(response => {
            if (response.data) {
                localStorage.calendar = response.data.data;
                localStorage.lastUpdateCalendar = JSON.stringify(response.data.lastUpdate);
                return JSON.parse(response.data.data);
            }
            return response.data;
        })
    }

}