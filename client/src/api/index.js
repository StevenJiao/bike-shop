import axios from 'axios'

const BASE_URL = 'https://localhost:7155'

export const ENDPOINTS = {
    authenticate: 'User/authenticate',
    itemAll: 'Item/all'
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + '/api/' + endpoint + '/'
    return {
        post: user => axios.post(url, user),
        get: () => axios.get(url)
    }
}