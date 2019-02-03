/* eslint-disable no-useless-constructor */
import axios from 'axios';
import BaseService from './base-service';


class ItemsService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  getItemTypes = () => {
    const path = `${this.basePath}/itemTypes`;
    return axios.get(path);
  };
}

export default ItemsService;
