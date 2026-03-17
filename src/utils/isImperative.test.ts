import { describe, expect, test } from 'vitest';
import { isImperative } from './isImperative';

describe('isImperative', () => {
  test('valid imperative sentences should return true', () => {
    const validImperatives = [
      'replace stale data with fresh data',
      'bump version to v1.2.0',
      'add new feature to dashboard',
      'fix critical bug in authentication',
      'update dependencies to latest versions',
      'refactor database query logic',
      'implement user profile page',
      'create migration script for users table',
      'improve error handling in services',
      'delete unused configuration files',
      'remove deprecated API endpoints',
      'merge pull request from feature branch',
      'stop background service',
      'run database migrations',
      'revert breaking changes in payment module',
      'optimize performance for large datasets',
      'build production bundles',
      'deploy to staging environment',
      'patch security vulnerability',
      'release version 2.0.0',
    ];

    validImperatives.forEach((sentence, index) => {
      const result = isImperative(sentence);
      expect(
        result.isImperative,
        `#${index + 1} Failed: "${sentence}" - ${result.isImperative ? 'OK' : (result as any).reason}`,
      ).toBe(true);
    });
  });

  test('invalid imperative sentences should return false', () => {
    const invalidImperatives = [
      'this is not imperative',
      'the service was updated',
      'a new feature has been added',
      'bugs are being fixed',
      'dependencies updated successfully',
      'the branch was merged',
    ];

    invalidImperatives.forEach((sentence, index) => {
      const result = isImperative(sentence, false);
      expect(
        result.isImperative,
        `#${index + 1} Failed: "${sentence}" - should not be imperative`,
      ).toBe(false);
    });
  });
});
