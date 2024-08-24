import { GetParams } from '../types/crud-action-params';

export async function get<T>({
  filter,
}: GetParams): Promise<T> {
  const document = await this.findOne(filter).select('-_id -__v -createdAt -updatedAt').lean();
  if (!document) {
    return undefined;
  }
  return document;
}
