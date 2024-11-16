import { registerAs } from '@nestjs/config';

export type AppConfig = {
  nodeEnv: string;
  name: string;
  port: number;
  apiPrefix: string;
};

export default registerAs<AppConfig>('app-config', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME || 'VN_LDR_SERVER',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
  apiPrefix: process.env.API_PREFIX || '/api/v1',
}));
