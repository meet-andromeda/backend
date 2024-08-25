import { handlerPath } from '../../../../commons/handler-resolver';
import HandlerConfig from '../../../../types/handler-config';

const handlerConfig: HandlerConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  events: [
    {
      http: {
        method: 'get',
        path: '/{transactionId}',
        cors: true,
        request: {
          parameters: {
            paths: {
              transactionId: true,
            },
          },
        },
      },
    },
  ],
};

export default handlerConfig;
