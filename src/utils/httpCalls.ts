import { DEPLOYED_API_BASE_URL } from "./apiConfig";

/**
 * HTTP CALL TO REFRESH TOKEN
 * 
 * @param errorCallback 
 */
export const refreshToken = async (errorCallback?: (error: any) => void) => {
  if (localStorage.refresh_token) {
    const url = DEPLOYED_API_BASE_URL + 'token/refresh/';

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: localStorage.refresh_token }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('access_token', data.access);
        })
        .catch((error) => {
          errorCallback && errorCallback(error);
        });
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  }
}

/**
 * HTTP CALL TO GET PROFILE DETAIL
 * 
 * @param callback 
 * @param errorCallback 
 */
export const getProfileDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'creators/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
}

/**
 * HTTP CALL TO GET CAMPAIGNS DETAIL
 * 
 * @param callback 
 * @param errorCallback 
 */
export const getCampaignsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'campaigns-detail/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
}

/**
 * HTTP CALL TO GET BRANDS
 * 
 * @param callback 
 * @param errorCallback 
 */
export const getBrands = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'brands/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
}
