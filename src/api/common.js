export const BaseURL =
  process.env.NODE_ENV === "production"
    ? `http://${window.location.hostname}:5000`
    : `http://${window.location.hostname}:5000`; //"https://place-de-la-victoire.onrender.com";
export const API_URL = `${BaseURL}/api`;
