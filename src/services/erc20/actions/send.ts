import { Wallet } from 'ethers';
import { Provider } from '@ethersproject/providers';
import transferErc20Token from '../helpers/transfer-erc20-token';

interface SendParams {
  walletPrivateKey: string;
  web3Provider: Provider;
  destinationAddress: string;
  tokenAddress: string;
  tokenAmountInWei: string;
}

/**
 * Sends {tokenAmountInWei} tokens of {tokenAddress} to {destinationAddress} using the {walletPrivateKey}.
 *
 * @param walletPrivateKey     Private key of the wallet sending the tokens
 * @param web3Provider         Provider (such as alchemy) used to send the transaction
 * @param destinationAddress   Recipient of the tokens
 * @param tokenAddress         Address of the token to be sent
 * @param tokenAmountInWei     Amount in wei as string
 *
 * @returns Transaction hash
 */
export async function send({
  walletPrivateKey,
  web3Provider,
  destinationAddress,
  tokenAddress,
  tokenAmountInWei,
}: SendParams): Promise<string> {
  const signer = new Wallet(walletPrivateKey, web3Provider);
  const transaction = await transferErc20Token({
    signer,
    destinationAddress,
    tokenAddress,
    tokenAmountInWei,
  });

  return transaction.hash;
}
