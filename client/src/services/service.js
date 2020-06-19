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

    addPayment(payment) {
        return api.post('addPayment', payment);
    }

    getPayments(clientId) {
        return api.post('payments', {clientId: clientId});
    }
    
    deletePayment(paymentId) {
        return api.delete('deletePayment/'+paymentId);
    }
}

export default new ApiService();