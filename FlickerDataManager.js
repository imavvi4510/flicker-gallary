import appConstant from './app-constant';
import DataManager from './DataManager';

class FlickerDataManager extends DataManager {
  // Constants

  apiKey = appConstant.apiKey;
  baseURLString = appConstant.baseURLString;
  flickrMethod = {
    search: 'flickr.photos.search',
    interesting: 'flickr.interestingness.getList',
  };

  constructor() {
    super();
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
}

export default new FlickerDataManager();
