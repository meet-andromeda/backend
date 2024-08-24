import { TransactionResponse } from '@ethersproject/providers';
import { Wallet, ethers } from 'ethers';
import erc20Abi from '../abi';
import getGasConfiguration from '../../../helpers/get-gas-configuration';

interface TransferErc20Token {
  signer: Wallet;
  destinationAddress: string;
  tokenAddress: string;
  tokenAmountInWei: string;
  customGasPrice?: string;
}

/**
 * Transfers {tokenAmountInWei} tokens of {tokenAddress} from {signer} to {destinationAddress}.
 * A {customGasPrice} can be passed to the function as string or ethers.BigNumber
 *
 * @param signer              ethers.Wallet object
 * @param destinationAddress  Recipient of native tokens
 * @param tokenAmountInWei    Amount in wei as string
 * @param customGasPrice      Custom gas price to uses
 *
 * @returns ethers.TransactionResponse
 */
async function transferErc20Token({
  signer,
  destinationAddress,
  tokenAddress,
  tokenAmountInWei,
  customGasPrice,
}: TransferErc20Token): Promise<TransactionResponse> {
  const tokenConnection = new ethers.Contract(tokenAddress, erc20Abi, signer);

  const gasConfiguration = await getGasConfiguration({
    signer,
    gasPrice: customGasPrice,
  });

  const response = await tokenConnection.transfer(
    destinationAddress,
    tokenAmountInWei,
    gasConfiguration,
  );

  return response;
}

export default transferErc20Token;
