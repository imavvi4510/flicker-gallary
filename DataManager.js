import {readData} from './Storage';
import {ToastAndroid} from 'react-native';

// Constants
const apiKey = '6f102c62f41998d151e5a1b48713cf13';
const baseURLString = 'https://api.flickr.com/services/rest';
const flickrMethod = {
  search: 'flickr.photos.search',
  interesting: 'flickr.interestingness.getList',
};

// Public
export function executeFetchRequest(url, completion, readFromDB = false) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => _handleResponse(json))
    .then((photos) => completion(photos))
    .catch((error) => {
      ToastAndroid.show("Couldn't refresh the feed", ToastAndroid.LONG);
      if (readFromDB) {
        readData().then((photos) => {
          if (photos) completion(JSON.parse(photos));
        });
      }
    });
}
export function urlForSearchtext(searchText) {
  const extraParams = {text: searchText};
  return _constructFlickrURL(flickrMethod.search, extraParams);
}
export function urlForInteresting(page = 1) {
  return _constructFlickrURL(flickrMethod.interesting);
}

// Private
function _constructFlickrURL(method, extraParams) {
  let params = {
    api_key: apiKey,
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
  return baseURLString + '?' + queryString;
}
function _handleResponse(json) {
  return new Promise((resolve, reject) => {
    if (json.stat === 'ok') {
      resolve(json.photos.photo);
    } else {
      reject('Flicker error code: ' + json.stat + ', reason: ' + json.message);
    }
  });
}
