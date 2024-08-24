type CustomFilter = Record<string, string
| number
| Date
| Record<string, unknown>
| Record<string, unknown>[]>
| string[]
| Record<string, unknown>;

interface GetParams {
  filter: CustomFilter;
  excludedFields?: string[];
}

interface UpsertParams<T = any> {
  filter: CustomFilter;
  newData: Record<string, unknown> | T;
  upsertDocument?: boolean;
  containsMaps?: boolean;
  shouldThrowErrorIfDocumentNotFound?: boolean;
}

interface CreateDocumentParams<T = any> {
  newData: Record<string, unknown> | T;
}

export {
  GetParams,
  UpsertParams,
  CreateDocumentParams,
};
