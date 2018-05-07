import loginModule from "./login/login.module";
import registrationModule from "./registration/registration.module";
import resetModule from "./reset/reset.module";

import PublicHttpService from "./service/public-http.service";

require('./public.scss');

export default angular.module('public', ['ngMessages', loginModule, registrationModule, resetModule])
    .service("PublicHttpService", PublicHttpService)
    .name;