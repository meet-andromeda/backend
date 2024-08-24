const sesRoleStatement = {
  Effect: 'Allow',
  Action: [
    'ses:*',
  ],
  Resource: '*',
};

export default sesRoleStatement;
