export interface InvokeLambdaEvent {
  headers: string;
  body: string;
  pathParameters: Record<string, any>;
  queryStringParameters: Record<string, any>;
}
