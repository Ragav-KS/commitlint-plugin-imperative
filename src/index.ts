import { Plugin } from '@commitlint/types';
import { imperativeSubjectRule } from './rules';
export { isImperative } from './utils/isImperative';

const plugin = {
  rules: {
    'imperative-subject': imperativeSubjectRule,
  },
} satisfies Plugin;

export default plugin;
