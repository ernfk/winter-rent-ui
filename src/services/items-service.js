/* eslint-disable no-useless-constructor */
import axios from 'axios';
import BaseService from './base-service';

class ItemsService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  getItemTypes = (accessToken) => {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const path = `${this.basePath}/itemTypes`;
    return axios.get(path, config);
  };

  getItemPropertyDefinitions = () => {
    const path = `${this.basePath}/itemPropertyDefinitions`;
    return axios.get(path);
  };

  addItem = (item) => {
    const path = `${this.basePath}/items`;
    return axios.post(path, item);
  };

  getItems = (accessToken) => {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const path = `${this.basePath}/items`;
    return axios.get(path, config);
  };

  deleteItem = (itemId) => {
    const path = `${this.basePath}/items/`;
    return axios.delete(path + itemId);
  };

  updateItem = (item) => {
    const path = `${this.basePath}/items`;
    return axios.put(path, item);
  };
}

export default ItemsService;
