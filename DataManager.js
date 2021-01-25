import appConstant from './app-constant';

export default class DataManager {
  // Public
  constructor() {}

  async executeFetchRequest(url) {
    try {
      const response = await fetch(url);
      const json_response = await response.json();
      const photos = await this._handleResponse(json_response);
      return photos;
    } catch (error) {
      throw new Error(error);
    }
  }

  _handleResponse(json) {
    return new Promise((resolve, reject) => {
      if (json.stat === 'ok') {
        resolve(json.photos.photo);
      } else {
        reject('api error code: ' + json.stat + ', reason: ' + json.message);
      }
    });
  }
}
