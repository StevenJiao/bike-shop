import axios from 'axios'

// const BASE_URL = 'https://localhost:7155'
const BASE_URL = 'https://my-bike-app.azurewebsites.net/'

export const ENDPOINTS = {
    authenticate: 'User/authenticate',
    itemAll: 'Item/all',
    orderCreate: 'Order/create',
    orderAll: 'Order/all'
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + '/api/' + endpoint + '/'
    const requestOptions = {
        headers: authHeader()
    }
    // console.log(JSON.stringify(requestOptions));
    return {
        post: data => axios.post(url, data, requestOptions),
        get: () => axios.get(url, requestOptions)
    }
}

function authHeader() {
    // return authorization header with basic auth credentials
    let authData = localStorage.getItem('authData');
    if (authData) {
        return { 'Authorization': 'Basic ' + authData };
    } else {
        return {};
    }
}