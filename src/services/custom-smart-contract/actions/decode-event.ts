import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Result } from 'ethers/lib/utils';

interface DecodeEventFromTransactionParams {
  transactionHash: string;
  eventParams: string[]; // ['address', 'address', 'uint256']
  topic: string;
  provider: Provider;
}

async function decodeEventFromTransaction({
  transactionHash,
  eventParams,
  topic,
  provider,
}: DecodeEventFromTransactionParams): Promise<Result> {
  const receipt = await provider.getTransactionReceipt(transactionHash);
  if (!receipt || !receipt.logs) {
    return [];
  }
  const allLogs = [];

  receipt.logs.forEach((log) => {
    if (log.topics.includes(topic)) {
      const decodedLog = ethers.utils.defaultAbiCoder.decode(
        eventParams,
        log.data,
      );
      allLogs.push(decodedLog);
    }
  });

  return allLogs;
}

export { decodeEventFromTransaction };
