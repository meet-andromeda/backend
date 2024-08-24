import { handlerPath } from '../../../../commons/handler-resolver';
import HandlerConfig from '../../../../types/handler-config';

const handlerConfig: HandlerConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 10,
  events: [
    {
      http: {
        method: 'get',
        path: '/{userAddress}',
        cors: true,
        request: {
          parameters: {
            paths: {
              userAddress: true,
            },
          },
        },
      },
    },
  ],
};

export default handlerConfig;
