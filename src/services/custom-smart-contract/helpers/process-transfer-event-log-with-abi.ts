import {
  Log,
  Provider,
} from '@ethersproject/providers';
import { utils } from 'ethers';

interface ProcessTransferEventLogsWithAbiParams {
  abi: string;
  logs: Log[];
  provider: Provider;
  transferTopic: string;
}

interface TransferEvent {
  from: string;
  to: string;
  value: number;
  transactionHash: string;
  token: string;
  sender: string;
}

async function processTransferEventLogsWithAbi({
  abi,
  logs,
  provider,
  transferTopic,
}: ProcessTransferEventLogsWithAbiParams): Promise<TransferEvent[]> {
  const eventInterface = new utils.Interface(abi);
  const eventsPromises = logs.map(async (log: Log) => {
    if (!log.topics.includes(transferTopic)) {
      return undefined;
    }
    const parsedLog = eventInterface.parseLog(log).args;
    const receipt = await provider.getTransactionReceipt(log.transactionHash);
    return {
      from: parsedLog.from,
      to: parsedLog.to,
      value: parsedLog.value.toString(),
      transactionHash: log.transactionHash,
      token: log.address,
      sender: receipt.from,
    };
  });

  const events = await Promise.all(eventsPromises);
  return events;
}

export default processTransferEventLogsWithAbi;
