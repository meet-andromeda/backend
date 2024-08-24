/**
   * Generic function to build the query string with received params
   * @param {object} params The object with params to build the query string
   * @returns the string with the query
   */
function getQueryString<T>(params: T): string {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (value !== undefined && value != null) {
        return `${key}=${encodeURIComponent(value)}`;
      }
      return '';
    })
    .join('&');
  return queryString;
}

export default getQueryString;
