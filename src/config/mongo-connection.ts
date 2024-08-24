const mongoUri = (serviceName: string, clusterName: string): string => `mongodb+srv://${encodeURIComponent(process.env.AWS_ACCESS_KEY_ID ?? '')}:${encodeURIComponent(process.env.AWS_SECRET_ACCESS_KEY ?? '')}@${encodeURIComponent(clusterName)}.ewmkw.mongodb.net/${encodeURIComponent(serviceName)}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(process.env.AWS_SESSION_TOKEN ?? '')}`;

const clusterName = (stage: string): string => {
  switch (stage) {
    case 'dev':
      return 'andromeda';
    default:
      throw new Error('There was a problem connecting to the database, review the selected stage');
  }
};

const mongoConnection = ({
  serviceName,
  stage,
}: {
  serviceName: string,
  stage: string,
}): string => {
  const cluster = clusterName(stage);
  return mongoUri(serviceName, cluster);
};

export default mongoConnection;
