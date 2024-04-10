import axios from 'axios';
import { DEPLOYED_API_BASE_URL } from './apiConfig';


const api = axios.create({
  baseURL: `${DEPLOYED_API_BASE_URL}`,
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});

// GET request
export const httpGET = (endpoint: string, callback: Function, errorCallback: Function) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') || '' : '';

  api.get(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    callback(response)
  }).catch(error => {
    errorCallback(error)
  });
}

// LOGIN POST request
export const httpLoginPOST = (endpoint: string, data: any, callback: any, errorCallback: any) => {
  api.post(endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    callback(response)
  }).catch(error => {
    errorCallback(error)
  });
}

export const httpRefreshTokenPOST = (endpoint: string, data: any, callback: any, errorCallback?: any) => {
  api.post(endpoint, data).then(response => {
    callback(response)
  }).catch(error => {
    console.error(error)
    errorCallback && errorCallback(error)
  });
}

// POST request
export const httpPOST = (endpoint: string, data: any, callback: any, errorCallback?: any) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') || '' : '';

  api.post(endpoint, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    callback(response)
  }).catch(error => {
    console.error(error)
    errorCallback && errorCallback(error)
  });
}


// PUT request
export const httpPUT = (endpoint: string, data: any, callback: Function, errorCallback: Function) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') || '' : '';

  api.put(endpoint, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    callback(response)
  }).catch(error => {
    errorCallback(error)
  });
}

// DELETE request
export const httpDELETE = (endpoint: string, callback: Function, errorCallback: Function) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') || '' : '';

  api.delete(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    callback(response)
  }).catch(error => {
    errorCallback(error)
  });
}