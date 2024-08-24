/**
 * Generic function to build the url replacing path params
 *
 * @param {object} args.path The original path to replace with params values
 * @param {object} args.params The object with params to replace on url
 * @returns the string with the query
 */
function buildUrlWithPathParams(
  path: string,
  params: { [param: string]: string } = {},
): string {
  let finalUrl = path;
  Object.entries(params).forEach(([key, value]) => {
    finalUrl = finalUrl.replace(`{${key}}`, value as string);
  });
  return finalUrl;
}

export default buildUrlWithPathParams;
