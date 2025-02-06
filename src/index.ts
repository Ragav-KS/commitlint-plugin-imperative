import { Plugin } from '@commitlint/types';

const plugin: Plugin = {
  rules: {
    'imperative-subject': () => [
      false,
      'This is a scaffold rule. Implementation pending.',
    ],
  },
};

export default plugin;
