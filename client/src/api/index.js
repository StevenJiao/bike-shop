import axios from 'axios'

const BASE_URL = 'https://localhost:7155'

export const ENDPOINTS = {
    authenticate: 'User/authenticate',
    itemAll: 'Item/all',
    order: 'Order/create'
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + '/api/' + endpoint + '/'
    return {
        post: data => axios.post(url, data),
        get: () => axios.get(url)
    }
}