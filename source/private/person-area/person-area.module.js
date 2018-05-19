import personRouter from "./person-area.router";

require('./person-area.scss');

export default angular.module('private.person', [])
    .config(personRouter)
    .name;