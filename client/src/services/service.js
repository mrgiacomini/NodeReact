import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API;

class ApiService {

    getClients() {
        return axios.get(API_BASE_URL+'clients');
    }

    getClientById(clientId) {
        return axios.get(API_BASE_URL + clientId);
    }

    deleteClient(clientId) {
        return axios.delete(API_BASE_URL+clientId);
    }

    addClient(client) {
        return axios.post(API_BASE_URL+'addClient', client);
    }

    updateClient(client) {
        return axios.put(API_BASE_URL+'updateClient/'+client._id, client);
    }
}

export default new ApiService();