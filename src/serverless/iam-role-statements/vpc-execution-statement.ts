const vpcExecutionStatement = {
  Effect: 'Allow',
  Action: [
    'ec2:CreateNetworkInterface',
    'ec2:DescribeNetworkInterfaces',
    'ec2:DeleteNetworkInterface',
    'ec2:AssignPrivateIpAddresses',
    'ec2:UnassignPrivateIpAddresses',
  ],
  Resource: '*',
};

export default vpcExecutionStatement;
