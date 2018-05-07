export default function TokenService() {
    this.save = (token) => {
        localStorage.setItem('token', token);
    };

    this.getToken = () => {
        return localStorage.getItem('token');
    };

    this.clear = () => {
        localStorage.removeItem('token');
    }
}