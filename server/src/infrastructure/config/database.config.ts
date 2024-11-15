import { registerAs } from '@nestjs/config';

export type DatabaseConfig = {
  databaseUrl: string;
};

export default registerAs<DatabaseConfig>('database-config', () => ({
  databaseUrl: process.env.DATABASE_URL,
}));
