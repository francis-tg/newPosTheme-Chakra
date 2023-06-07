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

export function groupObjectsByValue(objects, key) {
  const groupedObjects = {};

  for (const object of objects) {
    const value = object[key];
    if (groupedObjects[value]) {
      groupedObjects[value].push(object);
    } else {
      groupedObjects[value] = [object];
    }
  }

  return Object.values(groupedObjects);
}

export function removeObjectsByValue(objects, key, value) {
  return objects.filter(object => object[key] !== value);
}
