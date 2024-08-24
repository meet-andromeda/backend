import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

interface DecodeEventFromTransactionParams {
  transactionHash: string;
  eventParamNames: string[] // ['userAddress', 'solanaAddress']
  eventParams: string[]; // ['address', 'address', 'uint256']
  eventName: string;
  provider: Provider;
}

async function decodeEventFromTransaction({
  transactionHash,
  eventParams,
  eventParamNames,
  eventName,
  provider,
}: DecodeEventFromTransactionParams): Promise<Record<string, string | number>> {
  const receipt = await provider.getTransactionReceipt(transactionHash);
  if (!receipt || !receipt.logs) {
    return {};
  }
  const allLogs = [];
  const topic = ethers.utils.id(`${eventName}(${eventParams.join(',')})`);

  receipt.logs.forEach((log) => {
    if (log.topics.includes(topic)) {
      const decodedLog = ethers.utils.defaultAbiCoder.decode(
        eventParams,
        log.data,
      );
      allLogs.push(decodedLog);
    }
  });

  const firstLog = allLogs[0]; // Should be only 1 log
  const result = eventParamNames.reduce((obj, key, index) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = firstLog[index];
    return obj;
  }, {});

  return result;
}

export { decodeEventFromTransaction };
