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
    console.log('terms', doc.docs.flat());
  }

  let firstTerm = doc.terms().first(); // Get the first word

  const isFirstTermVerb = firstTerm.has('#Verb');
  const isFirstTermPresentTense = firstTerm.has('#PresentTense');

  const isImperative =
    doc.verbs().isImperative().found ||
    (isFirstTermVerb && isFirstTermPresentTense);

  if (isImperative) {
    return { isImperative: true };
  }

  if (isFirstTermVerb) {
    return {
      isImperative: false,
      reason: 'The first verb term must be in present tense.',
    };
  } else {
    return {
      isImperative: false,
      reason: 'The first term is not a verb.',
    };
  }
}
