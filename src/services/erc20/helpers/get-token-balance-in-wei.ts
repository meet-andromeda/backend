import { Provider } from '@ethersproject/providers';
import getErc20TokenBalance from './get-erc20-token-balance';

interface GetTokenBalanceInWeiParams {
  provider: Provider;
  tokenAddress: string;
  userAddress: string;
}

/**
 * Get the token balance in wei from the native token or an ERC20 token.
 * The native token addresses considered are:
 * - `WMATIC` for Polygon.
 * - `WETH` for Ethereum.
 *
 * @param    provider     Provider (such as alchemy) used to read from the blockchain.
 * @param    tokenAddress Address of the token whose balance is to be requested
 * @param    userAddress  Address of the user whose token balance is to be requested
 * @returns The user's token balance in wei as a decimal string
 */
async function getTokenBalanceInWei({
  provider,
  tokenAddress,
  userAddress,
}: GetTokenBalanceInWeiParams): Promise<string> {
  const balanceInWei = await getErc20TokenBalance({
    provider,
    tokenAddress,
    userAddress,
  });

  return balanceInWei.toString();
}

export default getTokenBalanceInWei;
