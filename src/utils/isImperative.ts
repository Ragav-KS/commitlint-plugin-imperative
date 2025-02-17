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

  let firstTerm = doc.terms().first(); // Get the first word

  const isFirstTermVerb = firstTerm.has('#Verb');
  const isFirstTermPresentTense = firstTerm.has('#PresentTense');

  const isImperative = isFirstTermVerb && isFirstTermPresentTense;

  if (isImperative) {
    return { isImperative: true };
  }

  if (debug) {
    console.log(
      'isImperative according to compromise?',
      doc.verbs().isImperative().found,
    );

    console.log('terms', doc.docs.flat());
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
