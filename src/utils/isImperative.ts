import nlp from 'compromise';

type IsImperativeResult =
  | {
      isImperative: true;
    }
  | {
      isImperative: false;
      reason: string;
    };

export function isImperative(
  sentence: string,
  debug: boolean = false,
): IsImperativeResult {
  const doc = nlp(sentence);

  if (debug) {
    console.log(doc.docs.flat());
  }

  const verbs = doc.verbs();
  const isImperative = verbs.isImperative().found;

  if (isImperative) {
    return { isImperative: true };
  }

  return {
    isImperative: false,
    reason: 'The subject is not in imperative form.',
  };
}
