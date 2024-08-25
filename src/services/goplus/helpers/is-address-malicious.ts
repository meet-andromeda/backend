import { MaliciousnessResponse } from '../types/maliciousness-result';

export function isAddressMalicious(addressReport: MaliciousnessResponse): boolean {
  const maliciousness = addressReport.result;
  return Object.values(maliciousness).some((value) => value === '1');
}
