import { AxiosError, AxiosRequestConfig } from 'axios';

interface AxiosConfig extends AxiosRequestConfig {
  retryCount?: number;
}

interface AxiosConfigCustom extends AxiosConfig {
  retryCount: number;
}

interface AxiosErrorCustom extends AxiosError {
  config: AxiosConfigCustom;
}

export default AxiosErrorCustom;
