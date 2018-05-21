import news from "./news";

export default function HomeController(CalendarService, $state) {
    let vm = this;
    vm.news = news.data;
    vm.loading = CalendarService.getCalendars().then(response => {
        vm.day = response.months.find(m => m.month === parseInt(moment().format('M')) - 1).days[parseInt(moment().format('D')) - 1];
    });

    vm.getDisplayPatient = (patient) => {
        return patient && patient.name || "Свободно";
    };

    vm.goToPatient = (patient) => {
        patient ? $state.go('patients', {userId: patient.id}) : $state.go('calendar');
    };
}