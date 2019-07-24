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
    const config = this.getAuthConfig();
    const path = `${this.basePath}/profile/${username}`;

    return axios.get(path, config);
  };

  updateUserProfile = (username, userProfile) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/profile/${username}`;

    return axios.put(path, userProfile, config);
  };

  isUserAdmin = (username) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/profile/${username}/role`;

    return axios.get(path, config);
  };
}

export default UserService;
