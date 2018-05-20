export default function PersonAreaService($http) {

    this.save = (image, name, secondName, phone, address, position) => $http.post('api/profile/save', {
        details: JSON.stringify({
            image: image,
            name: name,
            secondName: secondName,
            phone: phone,
            address: address,
            position: position
        })
    });

    this.getUserDetails = () => $http.get('api/profile/get');
}