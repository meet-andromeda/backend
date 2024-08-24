import User from '../model';
import { UserInformation } from '../types/user-information';

interface GetOrCreateParams {
  userAddress: string;
}

export async function getOrCreate({
  userAddress,
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

  // TODO: Use Circle to create wallets
  const newUserInformation = await User.upsert({
    filter,
    newData: {
      userAddress,
      wallets: {},
    },
    containsMaps: true,
    upsertDocument: true,
  });

  return newUserInformation;
}
