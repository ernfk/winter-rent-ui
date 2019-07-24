/* eslint-disable no-useless-constructor */
import axios from 'axios';
import BaseService from './base-service';

class ItemsService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  getItemTypes = (accessToken) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/itemTypes`;
    return axios.get(path, config);
  };

  getItemPropertyDefinitions = () => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/itemPropertyDefinitions`;
    return axios.get(path, config);
  };

  addItem = (item) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/items`;
    return axios.post(path, item, config);
  };

  getItems = (accessToken) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/items`;
    return axios.get(path, config);
  };

  deleteItem = (itemId) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/items/`;
    return axios.delete(path + itemId, config);
  };

  updateItem = (item) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/items`;
    return axios.put(path, item, config);
  };
}

export default ItemsService;
