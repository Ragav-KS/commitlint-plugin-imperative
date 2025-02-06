import type { UserConfig } from '@commitlint/types';
import myPlugin from './src/index';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'imperative-subject': [1, 'always'] },
  plugins: [myPlugin],
};

export default config;
