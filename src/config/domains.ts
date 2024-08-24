interface Domain {
  url: string;
  enabled: boolean;
}

const domains: Record<string, Domain> = {
  prod: {
    url: ' api-meetandromeda.io',
    enabled: true,
  },
  testing: {
    url: 'none',
    enabled: false,
  },
};

export { domains };
export type {
  Domain,
};
