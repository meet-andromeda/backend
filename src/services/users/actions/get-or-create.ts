import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import User from '../model';
import { UserInformation } from '../types/user-information';
import { WalletInformation } from '../types/wallet-information';
import config from '../config';
import { blockchainNameToId } from '../constants';

interface GetOrCreateParams {
  userAddress: string;
  circleApiKey: string;
  circleEntitySecret: string;
}

export async function getOrCreate({
  userAddress,
  circleApiKey,
  circleEntitySecret,
}: GetOrCreateParams): Promise<UserInformation> {
  const filter = {
    userAddress: userAddress.toLowerCase(),
  };

  const userInformation = await User.get({
    filter,
  });

  if (userInformation) {
    return userInformation;
  }

  const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
    apiKey: circleApiKey,
    entitySecret: circleEntitySecret,
  });

  const response = await circleDeveloperSdk.createWallets({
    accountType: 'SCA',
    blockchains: [
      'MATIC',
    ],
    count: 1,
    walletSetId: config.circleWalletSetId,
  });

  const { wallets } = response.data;

  const walletsData: Record<number, WalletInformation> = wallets.reduce((acc, wallet) => {
    const networkId = blockchainNameToId[wallet.blockchain];
    acc[networkId] = {
      networkId,
      id: wallet.id,
      address: wallet.address,
    };
    return acc;
  }, {});

  const newUserInformation = await User.upsert({
    filter,
    newData: {
      userAddress,
      wallets: walletsData,
    },
    containsMaps: true,
    upsertDocument: true,
  });

  return newUserInformation;
}
