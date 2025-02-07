import type { UserConfig } from '@commitlint/types';
import myPlugin from './src/index';

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'imperative-subject': [2, 'always', { debug: true }],
  },
  plugins: [myPlugin],
} satisfies UserConfig;

export default config;
