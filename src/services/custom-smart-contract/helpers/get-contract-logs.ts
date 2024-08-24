import {
  Log,
  Provider,
} from '@ethersproject/providers';

interface GetContractLogsParams {
  contract: string;
  topic: string;
  fromBlock: number;
  toBlock: number;
  provider: Provider;
}

async function getContractLogs({
  contract,
  provider,
  fromBlock,
  toBlock,
  topic,
}: GetContractLogsParams): Promise<Log[]> {
  const logs = await provider.getLogs({
    fromBlock: fromBlock + 1,
    toBlock,
    address: contract,
    topics: [topic],
  });
  return logs;
}

export default getContractLogs;
