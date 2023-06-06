export const BaseURL =
  process.env.NODE_ENV === "production"
    ? `http://${window.location.hostname}:5010`
    : `http://${window.location.hostname}:5010`; //"https://place-de-la-victoire.onrender.com";
export const API_URL = `${BaseURL}/api`;

export function fetchAPI(method, url, data, options) {
  if (method !== "GET") {
    return fetch(url, {
      method: method,
      headers: options,
      body: JSON.stringify(data)
    });
  } else {
    return fetch(url, {
      method: method,
      headers: options
    });
  }
}
