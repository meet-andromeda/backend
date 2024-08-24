import { Provider } from '@ethersproject/providers';
import { APIGatewayProxyEvent, SQSEvent, ScheduledEvent } from 'aws-lambda';

interface EventWithWeb3Injection extends APIGatewayProxyEvent, SQSEvent, ScheduledEvent {
  networkId?: number;
  provider?: Provider;
}

export default EventWithWeb3Injection;
