import personRouter from "./person-area.router";
import PersonAreaService from "./person-area.http.service";

require('./person-area.scss');

export default angular.module('private.person', [])
    .config(personRouter)
    .service("PersonAreaService", PersonAreaService)
    .name;