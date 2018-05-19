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

    this.saveCalendars = (calendar) => $http.post('api/calendar/save', {
        data: calendar,
        lastUpdate: JSON.parse(localStorage.lastUpdateCalendar)
    }).then(response => {
        localStorage.calendar = JSON.stringify(calendar);
        localStorage.lastUpdateCalendar = JSON.stringify(localStorage.lastUpdateCalendar);
        return response;
    });

    function getLastUpdateDate() {
        let date = localStorage.lastUpdateCalendar;
        return date ? JSON.parse(date) : new Date();
    }

    function getCalendars() {
        return $http.get('api/calendar/get').then(response => {
            localStorage.calendar = JSON.stringify(response.data.data);
            localStorage.lastUpdateCalendar = JSON.stringify(response.data.lastUpdate);
            return response.data.data;
        })
    }

}