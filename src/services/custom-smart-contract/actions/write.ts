import { TransactionResponse } from '@ethersproject/providers';
import {
  Wallet,
  ethers,
} from 'ethers';

interface WriteParams {
  signer: Wallet;
  abi: string;
  args: string | number[]
  contractAddress: string;
  functionName: string;
}

async function write({
  signer,
  abi,
  args,
  contractAddress,
  functionName,
}: WriteParams): Promise<TransactionResponse> {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract[functionName](...args);
  const receipt = await tx.wait();
  return receipt;
}

export default write;
