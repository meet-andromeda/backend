import { MiddlewareObj } from '@middy/core';
import httpResponseSerializer from '@middy/http-response-serializer';

function jsonTextPlainHttpResponseSerializer(): MiddlewareObj {
  return httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      },
      {
        regex: /^text\/plain$/,
        serializer: ({ body }) => body,
      },
    ],
    defaultContentType: 'application/json',
  });
}

export default jsonTextPlainHttpResponseSerializer;
