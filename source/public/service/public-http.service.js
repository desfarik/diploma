export default function ($http) {

    this.sendSms = (phone, isReset = false) => $http.post('api/phone-verification', {
        via: "sms",
        countryCode: "375",
        phoneNumber: phone,
        reset: isReset
    });

    this.register = (login, password, phone, key) => $http.post('api/registration', {
        username: login,
        password: password,
        countryCode: "375",
        phoneNumber: phone,
        key: key
    });

    this.reset = (newPassword, phone, key) => $http.post('api/reset', {
        newPassword: newPassword,
        countryCode: "375",
        phoneNumber: phone,
        key: key
    });

    this.login = (user, password) => $http.post('login', {
        username: user,
        password: password
    })
}