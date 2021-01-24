import appConstant from './app-constant';

class DataManager {
  // Constants
  apiKey = appConstant.apiKey;
  baseURLString = appConstant.baseURLString;
  flickrMethod = {
    search: 'flickr.photos.search',
    interesting: 'flickr.interestingness.getList',
  };

  // Public
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

  urlForSearchtext(searchText) {
    const extraParams = {text: searchText};
    return this._constructFlickrURL(this.flickrMethod.search, extraParams);
  }

  urlForInteresting(page = 1) {
    return this._constructFlickrURL(this.flickrMethod.interesting, {page});
  }

  // Private
  _constructFlickrURL(method, extraParams) {
    let params = {
      api_key: this.apiKey,
      method: method,
      extras: 'url_m,url_h',
      format: 'json',
      nojsoncallback: '1',
      per_page: 10,
    };
    Object.assign(params, extraParams);
    const queryString = Object.keys(params)
      .map((key) => key + '=' + encodeURIComponent(params[key]))
      .join('&');
    return this.baseURLString + '?' + queryString;
  }

  _handleResponse(json) {
    return new Promise((resolve, reject) => {
      if (json.stat === 'ok') {
        resolve(json.photos.photo);
      } else {
        reject(
          'Flicker error code: ' + json.stat + ', reason: ' + json.message,
        );
      }
    });
  }
}

export default new DataManager();
