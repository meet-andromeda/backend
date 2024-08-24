import { createNotFoundError } from '../../errors/client';
import { createInternalServerError } from '../../errors/server';
import { UpsertParams } from '../types/crud-action-params';

async function upsert<T>({
  filter,
  newData,
  upsertDocument = true,
  containsMaps = false,
  shouldThrowErrorIfDocumentNotFound = true,
}: UpsertParams): Promise<T> {
  const newDocument = await this.findOneAndUpdate(
    filter,
    newData,
    {
      new: true,
      upsert: upsertDocument,
      maxTimeMS: 10000,
    },
  ).select('-_id -__v -createdAt -updatedAt');

  if (newDocument) {
    const errors = newDocument.validateSync();
    if (errors) {
      throw createInternalServerError(
        `There was an error adding the ${this.modelName} record - ${errors.message}`,
      );
    }
    return newDocument.toObject({ flattenMaps: containsMaps });
  }

  if (!upsertDocument) {
    if (shouldThrowErrorIfDocumentNotFound) {
      throw createNotFoundError(`${this.modelName} document not found`);
    }

    return undefined;
  }

  return newDocument;
}

export default upsert;
