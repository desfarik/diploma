import homeRouter from "./home.router";

require('./home.scss');

export default angular.module('private.home', [])
    .config(homeRouter)
    .name;