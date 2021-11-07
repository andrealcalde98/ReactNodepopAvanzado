import client, { setAuthorizationHeader } from '../../api/client';
import storage from '../../utils/storage';


const advertsBaseUrl = '/api/v1';

export const getLatestAdverts = () => {
  const url = `${advertsBaseUrl}/adverts`;
  // const accessToken = storage.get('auth')
  // setAuthorizationHeader(accessToken);
  return client.get(url);
};

export const getTags = () => {
  const url = `${advertsBaseUrl}/adverts/tags`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, advert);
};

export const getAdvert = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};
