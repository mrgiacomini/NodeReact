import api from './api';

class ApiService {

    getClients(userId) {
        console.log(process.env.REACT_APP_API)
        return api.get('clients');
    }

    getClientById(clientId) {
        return api.get(clientId);
    }

    deleteClient(clientId) {
        return api.delete('deleteClient/'+clientId);
    }

    addClient(client) {
        return api.post('addClient', client);
    }

    updateClient(client) {
        return api.put('updateClient/'+client._id, client);
    }
}

export default new ApiService();