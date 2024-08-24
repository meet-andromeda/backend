interface HandlerResponse<TBody = void> {
  statusCode: number;
  body: Record<string, unknown> | [Record<string, unknown>] | [] | {} | TBody;
}

export default HandlerResponse;
