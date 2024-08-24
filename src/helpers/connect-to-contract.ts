import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import {
  ContractInterface,
  Wallet,
} from 'ethers';
import { createInternalServerError } from '../commons/errors/server';

interface ConnectToContractParams {
  contractAddress: string;
  provider?: Provider;
  signer?: Wallet
  contractAbi: ContractInterface;
}

function connectToContract({
  contractAddress,
  provider,
  signer,
  contractAbi,
}: ConnectToContractParams): Contract {
  if ((!provider && !signer) || (provider && signer)) {
    throw createInternalServerError('Missing provider or signer or both were sent');
  }
  try {
    const connection = signer || provider;
    return new Contract(
      contractAddress,
      contractAbi,
      connection,
    );
  } catch (error) {
    throw createInternalServerError('Contract connection failed');
  }
}

export default connectToContract;
