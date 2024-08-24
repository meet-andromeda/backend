import { WalletInformation } from './wallet-information';

export interface UserInformation {
  userAddress: string;
  wallets: Record<number, WalletInformation>;
}
