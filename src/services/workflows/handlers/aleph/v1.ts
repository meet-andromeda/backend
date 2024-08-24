const v1 = {
  trigger: {

  },
  actions: [
    {
      // Decode Event
      actionName: 'Decode Event',
      params: {
        transactionHash: '0x4c613158fc73b05b9b49959ea3b35ea35cb47cc3566f36118a65a4b38b221512',
        eventName: 'HelloWorld',
        eventParamNames: ['userAddress', 'solanaAddress'],
        eventParams: ['address', 'string'],
      },
    },
    {
      // Mint Token with -> circle
    },
    {
      // Faucet (randome value) -> circle
    },
    {
      // Discord
      url: '',
    },
  ],
};

export {
  v1,
};
