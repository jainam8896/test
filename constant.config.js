/**
 * Get base url
 * @param {*} path
 * @returns
 */

export function baseUrl(path = "") {
  let url = `${process.env.BASE_URL}:${process.env.PORT}`;
  if (process.env.ENV !== "production") {
      url = `${process.env.BASE_URL}:${process.env.PORT}`;
  }
  if (process.env.PROXY_ENABLED == "true") {
      url = `${process.env.PROXY_URL}`;
  }
  return url + (path ? `${path}` : "");
  }

 export function apibaseUrl(path = "")  {
  let url = `${process.env.BASE_URL}:${process.env.PORT}/api/v1`;
  if (process.env.ENV !== "production") {
      url = `${process.env.BASE_URL}:${process.env.PORT}/api/v1`;
  }
  if (process.env.PROXY_ENABLED == "true") {
      url = `${process.env.PROXY_URL}`;
  }
  return url + (path ? `${path}` : "");
  }
