import {
  Document,
  Schema,
} from 'mongoose';
import { UserInformation } from '../types/user-information';
import { WalletInformation } from '../types/wallet-information';

interface UserDocument extends UserInformation, Document { }

const WalletSchema = new Schema<WalletInformation>({
  networkId: {
    type: Number,
    required: [true, 'Network ID is a required number'],
  },
  id: {
    type: String,
    required: [true, 'ID is a required string'],
  },
  address: {
    type: String,
    required: [true, 'Address is a required string'],
  },
});

const schema = new Schema<UserDocument>({
  userAddress: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'User Address is a required string'],
  },
  wallets: {
    type: Map,
    of: WalletSchema,
    required: [true, 'Wallets is a required map'],
  },
}, {
  timestamps: true,
});

export default schema;
export {
  UserDocument,
};
