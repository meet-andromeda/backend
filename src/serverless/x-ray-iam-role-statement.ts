const xRayIamRoleStatement = {
  Effect: 'Allow',
  Action: [
    'xray:PutTraceSegments',
    'xray:PutTelemetryRecords',
  ],
  Resource: '*',
};

export default xRayIamRoleStatement;
