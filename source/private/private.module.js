import privateRouter from "./private.router";
import privateComponents from "./components/private-components.module";

require('./private.scss');

export default angular.module('private', ['ngMessages', privateComponents])
    .config(privateRouter)
    .name;