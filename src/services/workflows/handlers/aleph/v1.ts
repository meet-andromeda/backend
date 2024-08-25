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
      actionName: 'Mint and Send Token',
      params: {
        userAddress: '0x767b881f081e8b7267d9d8a7a0504da638013205',
        contractAddress: '0xc0591e8be1bc8c42bc563ed9456ee1e7a8930708',
        abiFunctionSignature: 'mint(address,uint256)',
        abiFunctionParameters: ['0x5fc0227fe5c17c67b92acf37cc87ec66bce6c497', 1123581321345589],
      },
    },
    {
      // Faucet (randome value) -> circle
    },
    {
      // Discord
      actionName: 'Discord Message',
      params: {
        title: 'Aleph',
        url: 'https://discord.com/api/webhooks/1277046823818756166/H1btBB6pu12ab17QzoAGtlSQkdyWMpvlSB3b0gv0aonQ6um9uC-LRsehENkJZTLBaE6R',
      },
    },
  ],
};

export {
  v1,
};
