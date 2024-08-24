import { handlerPath } from '../../../../commons/handler-resolver';
import HandlerConfig from '../../../../types/handler-config';

const handlerConfig: HandlerConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 15,
  events: [
    {
      http: {
        method: 'post',
        path: '/listener',
        cors: true,
        request: {},
      },
    },
  ],
};

export default handlerConfig;
