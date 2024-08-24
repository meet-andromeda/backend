import type { AWS } from '@serverless/typescript';

type HandlerConfig = AWS['functions']['string'] & {
  enabled?: boolean;
};

export default HandlerConfig;
