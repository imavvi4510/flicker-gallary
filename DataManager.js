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
export async function executeFetchRequest(url) {
  console.log('the url calling>>>>>>>>>>>>>>>>>>>', url);
  try {
    const response = await fetch(url);
    const json_response = await response.json();
    const photos = await _handleResponse(json_response);
    return photos;
  } catch (error) {
    throw new Error(error);
  }
}
export function urlForSearchtext(searchText) {
  const extraParams = {text: searchText};
  return _constructFlickrURL(flickrMethod.search, extraParams);
}
export function urlForInteresting(page = 1) {
  return _constructFlickrURL(flickrMethod.interesting, {page});
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
