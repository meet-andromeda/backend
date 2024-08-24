import { Provider } from '@ethersproject/providers';
import {
  BigNumber,
  Wallet,
} from 'ethers';

interface GetGasConfigurationParams {
  signer: Provider | Wallet;
  gasPrice?: BigNumber | string;
  gasLimit?: BigNumber | string;
}

interface GetGasConfigurationResponse {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

/**
 * Returns the gasLimit and gasPrice for a given operation. If gasPrice is not provided, it is calculated
 * though the signer. Explicit gaslimit can be provided in which cas only gasPrice will be calculated. Operation
 * params abstracts gasLimit for known operations such as token transfer. gasLimit and opertaion cannot be undefined
 * at the same time.
 *
 * @param signer    Provier or ethers.Wallet
 * @param gasPrice  Custom gas price
 * @param gasLimit  Custom gas limit
 * @param operation Operation name used to get known gas limits
 *
 * @returns And object with gasLimit and gasPrice
 */
async function getGasConfiguration({
  signer,
  gasPrice,
  gasLimit,
}: GetGasConfigurationParams): Promise<GetGasConfigurationResponse> {
  let estimatedGasPrice = gasPrice;

  if (!gasPrice) {
    estimatedGasPrice = await signer.getGasPrice();
  }

  if (gasLimit) {
    return {
      gasPrice: BigNumber.from(estimatedGasPrice),
      gasLimit: BigNumber.from(gasLimit),
    };
  }

  const estimatedGasLimit = BigNumber.from('2500000');

  return {
    gasPrice: BigNumber.from(estimatedGasPrice),
    gasLimit: estimatedGasLimit,
  };
}

export default getGasConfiguration;
