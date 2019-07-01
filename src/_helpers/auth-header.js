export function authHeader() {
    // return authorization header with jwt token
    let userToken = localStorage.getItem('userToken');

    if (userToken) {
        return { 'Authorization': 'Token ' + userToken };
    } else {
        return {};
    }
}