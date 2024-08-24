import {
  Model,
  model,
} from 'mongoose';
import logger from '../../../commons/logger';
import schema, { UserDocument } from './schema';
import { get } from '../../../commons/models/crud-actions/get';
import { UserInformation } from '../types/user-information';
import { GetParams, UpsertParams } from '../../../commons/models/types/crud-action-params';
import upsert from '../../../commons/models/crud-actions/upsert';

interface UserModel extends Model<UserDocument> {
  get(params: GetParams): Promise<UserInformation>;
  upsert(params: UpsertParams): Promise<UserInformation>;
}

schema.index({ userAddress: 1 }, { unique: true });

schema.statics = {
  get,
  upsert,
};

schema.methods = {};

const User = model<UserDocument, UserModel>('User', schema);

User.on('index', (error) => {
  if (error) {
    logger.fatal({
      error: { message: error.message },
      info: {},
      name: 'user_model_index_error',
    });
  } else {
    logger.info({
      info: {},
      name: 'user_model_index_build_successful',
    });
  }
});

export default User;
