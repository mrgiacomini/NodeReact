import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/';

class ApiService {

    getClients() {
        return axios.get(API_BASE_URL+'clients');
    }

    getClientById(clientId) {
        return axios.get(API_BASE_URL + clientId);
    }

    deleteClient(clientId) {
        return axios.delete(API_BASE_URL + clientId);
    }

    addClient(client) {
        return axios.post(API_BASE_URL+'addClient', client);
    }

    editClient(client) {
        return axios.put(API_BASE_URL + client.id, client);
    }
}

export default new ApiService();