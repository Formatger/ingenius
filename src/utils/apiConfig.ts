export const LOCAL_API_BASE_URL = "http://localhost:8000";
export const DEPLOYED_API_BASE_URL = "https://ingenius-api-f948e80544f9.herokuapp.com/api/";

export function useApiBaseUrl() {
  let apiBaseUrl = DEPLOYED_API_BASE_URL;

  if (window?.location.hostname === "localhost") {
    apiBaseUrl = LOCAL_API_BASE_URL;
  }

  return apiBaseUrl;
}
