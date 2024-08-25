export interface MaliciousnessResponse {
  code: number,
  message: string,
  result: {
    cybercrime: string;
    money_laundering: string;
    number_of_malicious_contracts_created: string;
    gas_abuse: string;
    financial_crime: string;
    darkweb_transactions: string;
    reinit: string;
    phishing_activities: string;
    contract_address: string;
    fake_kyc: string;
    blacklist_doubt: string;
    fake_standard_interface: string;
    data_source: string;
    stealing_attack: string;
    blackmail_activities: string;
    sanctioned: string;
    malicious_mining_activities: string;
    mixer: string;
    fake_token: string;
    honeypot_related_address: string;
  };
}
