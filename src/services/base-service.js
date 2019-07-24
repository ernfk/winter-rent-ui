class BaseService {
  constructor() {
    this.basePath = 'http://localhost:6060/resources/api';
  }

  getAuthConfig = () => {
    const accessToken = window.localStorage.getItem('accessToken');

    return { headers: { Authorization: `Bearer ${accessToken}` } };
  };

  getAuthConfigWithContentType = () => {
    const accessToken = window.localStorage.getItem('accessToken');

    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
}

export default BaseService;
