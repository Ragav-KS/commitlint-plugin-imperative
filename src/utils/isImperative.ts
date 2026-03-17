import nlp from 'compromise';

type IsImperativeResult =
  | {
      isImperative: true;
    }
  | {
      isImperative: false;
      reason: string;
    };

// Common imperative verbs used in commit messages
const COMMON_IMPERATIVE_VERBS = new Set([
  'add',
  'fix',
  'remove',
  'update',
  'create',
  'delete',
  'implement',
  'refactor',
  'optimize',
  'improve',
  'bump',
  'merge',
  'revert',
  'replace',
  'run',
  'stop',
  'patch',
  'release',
  'build',
  'deploy',
]);

export function isImperative(
  sentence: string,
  debug: boolean = false,
): IsImperativeResult {
  const doc = nlp(sentence);

  if (debug) {
    console.log('Original sentence:', sentence);
    console.log('All terms:', doc.terms().map((t) => ({ text: t.text(), tags: t.tags })));
  }

  let firstTerm = doc.terms().first();
  if (!firstTerm) {
    return {
      isImperative: false,
      reason: 'No terms found in sentence.',
    };
  }

  const firstTermText = firstTerm.text().toLowerCase().trim();

  // Check 1: Direct NLP imperative detection (highest priority)
  if (doc.verbs().isImperative().found) {
    if (debug) {
      console.log('✓ Detected as imperative by NLP');
    }
    return { isImperative: true };
  }

  // Check 2: Try adding "the" after the first term if not present
  const secondTerm = doc.terms().eq(1);
  if (secondTerm && secondTerm.text().toLowerCase() !== 'the') {
    const sentenceWithThe = `${firstTermText} the ${sentence.substring(firstTermText.length).trim()}`;
    const docWithThe = nlp(sentenceWithThe);
    
    if (debug) {
      console.log('Trying with "the":', sentenceWithThe);
      console.log('Terms with "the":', docWithThe.terms().map((t) => ({ text: t.text(), tags: t.tags })));
    }
    
    if (docWithThe.verbs().isImperative().found) {
      if (debug) {
        console.log('✓ Detected as imperative with "the" added');
      }
      return { isImperative: true };
    }
  }

  // Check 3: Check if first term is a verb in present tense
  const isFirstTermVerb = firstTerm.has('#Verb');
  const isFirstTermPresentTense = firstTerm.has('#PresentTense');

  if (isFirstTermVerb && isFirstTermPresentTense) {
    if (debug) {
      console.log('✓ Detected as verb in present tense');
    }
    return { isImperative: true };
  }

  // Check 4: Check against common imperative verbs (lowest priority)
  if (COMMON_IMPERATIVE_VERBS.has(firstTermText)) {
    if (debug) {
      console.log('✓ Detected as common imperative verb');
    }
    return { isImperative: true };
  }

  // Not imperative
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
