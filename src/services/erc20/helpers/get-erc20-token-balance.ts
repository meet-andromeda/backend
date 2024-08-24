import { isHttpError } from 'http-errors';
import { Provider } from '@ethersproject/providers';
import { BigNumber } from 'bignumber.js';
import { createInternalServerError } from '../../../commons/errors/server';
import erc20Abi from '../abi';
import logger from '../../../commons/logger';
import connectToContract from '../../../helpers/connect-to-contract';

interface GetErc20TokenBalanceRequestParams {
  provider: Provider;
  tokenAddress: string;
  userAddress: string;
}

async function getErc20TokenBalance({
  provider,
  tokenAddress,
  userAddress,
}: GetErc20TokenBalanceRequestParams): Promise<string> {
  try {
    const tokenConnection = connectToContract({
      contractAddress: tokenAddress,
      provider,
      contractAbi: erc20Abi,
    });

    const balanceInWei: BigNumber = await tokenConnection.balanceOf(userAddress);

    return balanceInWei.toString();
  } catch (error) {
    if (isHttpError(error)) {
      throw error;
    }
    logger.error({
      name: 'get_erc_20_token_balance_failed',
      error,
    });
    throw createInternalServerError();
  }
}

export default getErc20TokenBalance;
