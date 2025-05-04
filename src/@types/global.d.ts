export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toHaveErrorCode(errorCode: string): R;
      toBeSuccessful(): R;
    }
  }
}
