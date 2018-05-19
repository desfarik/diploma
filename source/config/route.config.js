export default function ($urlRouterProvider, $httpProvider, appConfig) {
    $urlRouterProvider.otherwise(($injector, $location) => {
        $location.path('/')
    });

    $httpProvider.interceptors.push(() => {
            return {
                'request': (config) => {
                    if (config.url === "cg-busy.template.html") {
                        return config;
                    }
                    config.url = appConfig.api + config.url;
                    config.headers['Authorization'] = localStorage.token;
                    config.headers['Access-Control-Allow-Origin'] = true;
                    config.headers['Content-Type'] = 'application/json; charset=utf-8';
                    config.headers["X-Requested-With"] = "XMLHttpRequest";
                    return config;
                },
                // optional method
                'response':

                    function (response) {
                        // do something on success
                        console.log(response.headers['Authorization']);
                        return Promise.resolve(response);
                    }

                ,

                // optional method
                'responseError':

                    function (response) {
                        return Promise.reject(response);
                    }
            };
        }
    )
    ;
}