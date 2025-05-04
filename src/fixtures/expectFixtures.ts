import { APIResponse, Expect, expect as baseExpect } from '@playwright/test';

type ExpectFixtures = Expect & {
  toHaveErrorCode(response: APIResponse, expected: string): Promise<ExtendedMatcherResult>;
  toBeSuccessful(response: APIResponse): Promise<ExtendedMatcherResult>;
};

type ExtendedMatcherResult = {
  message: () => string;
  pass: boolean;
  name: string;
  expected?: number;
  actual?: unknown;
};

export const expect = baseExpect as ExpectFixtures;
expect.extend({
  async toHaveErrorCode(response: APIResponse, errorCode: string) {
    const assertionName = 'toHaveErrorCode';
    let pass: boolean;
    let matcherResult: unknown;
    const responseJson = await response.json();
    try {
      await baseExpect(response).not.toBeOK();
      baseExpect(responseJson).toHaveProperty('status', 'ERROR');
      baseExpect(responseJson).toHaveProperty('error.error_code', errorCode);
      pass = true;
    } catch (e: unknown) {
      if (e instanceof Error && 'matcherResult' in e) {
        matcherResult = (e as { matcherResult: unknown }).matcherResult;
      }
      pass = false;
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(errorCode)}\n` +
          (matcherResult && typeof matcherResult === 'object' && 'actual' in matcherResult
            ? `Received: ${this.utils.printReceived((matcherResult as { actual: unknown }).actual)}`
            : JSON.stringify(responseJson, null, 2))
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(errorCode)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult)}` : '');

    return {
      message,
      pass,
      name: assertionName,
      errorCode,
      actual:
        matcherResult && typeof matcherResult === 'object' && 'actual' in matcherResult
          ? (matcherResult as { actual: unknown }).actual
          : undefined
    };
  },
  async toBeSuccessful(response: APIResponse) {
    const assertionName = 'toBeSuccessful';
    let pass: boolean;
    let matcherResult: unknown;
    try {
      await baseExpect(response).toBeOK();
      baseExpect(await response.json()).toHaveProperty('status', 'SUCCESS');
      pass = true;
    } catch (e: unknown) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    const message = pass ? (): string => 'Passed' : (): string => 'Failed';

    return {
      message,
      pass,
      name: assertionName,
      actual:
        matcherResult && typeof matcherResult === 'object' && 'actual' in matcherResult
          ? (matcherResult as { actual: unknown }).actual
          : undefined
    };
  }
});
