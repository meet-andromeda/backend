const s3IamRole = {
  Effect: 'Allow',
  Action: [
    's3:*',
  ],
  Resource: '*',
};

export default s3IamRole;
