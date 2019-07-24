import axios from 'axios';
import BaseService from './base-service';

class ImageService extends BaseService {
  constructor(basePath) {
    super(basePath);
  }

  addImage = (file, itemId) => {
    const path = `${this.basePath}/images`;
    const config = this.getAuthConfigWithContentType();
    const formData = new FormData();

    formData.append('itemId', itemId);
    formData.append('file', file);

    return axios.post(path, formData, config);
  };

  getImageByItemId = (itemId) => {
    const config = this.getAuthConfig();
    const path = `${this.basePath}/images/${itemId}`;

    return axios.get(path, config);
  };

  deleteImage(imageId) {
    const path = `${this.basePath}/images/${imageId}`;

    return axios.delete(path);
  }

  updateImage(imageId, itemId, file) {
    const path = `${this.basePath}/images/${imageId}/items/${itemId}`;
    const config = this.getAuthConfigWithContentType();
    const formData = new FormData();

    formData.append('itemId', itemId);
    formData.append('file', file);

    return axios.put(path, formData, config);
  }
}

export default ImageService;
