import { connect, ConnectionStates, set } from 'mongoose';
import middy from '@middy/core';
import logger from '../../logger';

let isConnected = false;

async function createDatabaseConnection(uri: string): Promise<void | typeof import('mongoose')> {
  if (isConnected) {
    logger.info({ name: 'Using an existing database connection' });
    return Promise.resolve();
  }

  logger.info({ name: 'Using a new database connection' });
  const db = await connect(uri);
  logger.info({ name: 'Connection finished' });

  isConnected = db.connections[0].readyState === ConnectionStates.connected;

  return db;
}

function injectDatabaseConnection({
  uri,
}: { uri: string }): middy.MiddlewareObj<unknown, unknown> {
  const before = async (): Promise<void> => {
    set('strictQuery', true);
    set('bufferCommands', false);
    console.log({ uri });
    await createDatabaseConnection(uri);
  };

  return {
    before,
  };
}

export default injectDatabaseConnection;
