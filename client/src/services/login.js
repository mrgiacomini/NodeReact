import axios from 'axios';

class LoginService {
    login(facebookData) {
        return axios.post(process.env.REACT_APP_SERVER+'/facebooklogin', {userID: facebookData.userID, accessToken: facebookData.accessToken});
    }
}

export default new LoginService();