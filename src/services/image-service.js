import axios from 'axios';
import BaseService from './base-service';

class ImageService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  addImage = (file, itemId) => {
    const path = `${this.basePath}/images`;
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('itemId', itemId);
    formData.append('file', file);

    return axios.post(path, formData, config);
  };

  getImageByItemId = (itemId) => {
    const path = `${this.basePath}/images/${itemId}`;
    return axios.get(path);
  };

  deleteImage(imageId) {
    const path = `${this.basePath}/images/${imageId}`;
    return axios.delete(path);
  }

  updateImage(imageId, itemId, file) {
    const path = `${this.basePath}/images/${imageId}/items/${itemId}`;
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('itemId', itemId);
    formData.append('file', file);

    return axios.put(path, formData, config);
  }
}

export default ImageService;
