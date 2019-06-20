import axios from 'axios/index';
import BaseService from './base-service';

class UserService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  signUpUser = (user) => {
    const path = `${this.basePath}/auth/signup`;
    return axios.post(path, user);
  };

  signIn = (user) => {
    const path = `${this.basePath}/auth/signin`;
    return axios.post(path, user);
  };

  getUserProfile = (username) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const path = `${this.basePath}/profile/${username}`;

    return axios.get(path, config);
  }
}

export default UserService;
