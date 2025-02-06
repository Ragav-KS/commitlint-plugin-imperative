import type { UserConfig } from '@commitlint/types';
import myPlugin from './src/index';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: [myPlugin],
};

export default config;
