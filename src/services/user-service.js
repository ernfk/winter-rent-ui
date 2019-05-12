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
}

export default UserService;
