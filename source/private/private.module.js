import mainRouter from "./private.router";
import appComponents from "./../components/app-components.module";

require('./private.scss');

export default angular.module('private', ['ngMessages', appComponents])
    .config(mainRouter)
    .name;