import type { SyncRule } from '@commitlint/types';
import { isImperative } from './utils/isImperative';

export const imperativeSubjectRule: SyncRule<{
  debug?: boolean;
}> = ({ subject }, _, condition) => {
  const debug = condition?.debug ?? false;

  if (!subject) {
    return [false, 'subject may not be empty'];
  }

  const result = isImperative(subject, debug);

  return [result.isImperative, result.isImperative ? undefined : result.reason];
};
