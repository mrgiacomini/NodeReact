import api from './api';

class ApiService {

    getClients(userId) {
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

    sendEmail(client) {
        return api.post('sendEmail', client);
    }
}

export default new ApiService();