import * as path from 'path';
import * as assert from 'assert';
import AbstractError from './abstract-error';

class CustomError extends AbstractError {
  public value = 'foo';
  public method() {
    return this.value;
  }
}

const baseDir = path.join(__dirname, '..');

describe('AbstractError', () => {
  it('should instantiate a new CustomError', () => {
    assert.doesNotThrow(() => new CustomError('error message'));
  });
  it('should be compatible with instanceof', () => {
    const error = new CustomError('error message');

    assert(error instanceof Error);
    assert(error instanceof AbstractError);
    assert(error instanceof CustomError);
  });
  it('should be extendable', () => {
    const error = new CustomError('error message');

    assert.strictEqual(error.value, 'foo');
    assert.strictEqual(error.method(), 'foo');
  });
  it('should return the correct name property', () => {
    const error = new CustomError('error message');

    assert.strictEqual(error.name, 'CustomError');
  });
  it('should return the correct message property', () => {
    const error = new CustomError('error message');

    assert.strictEqual(error.message, 'error message');
  });
  it('should return the correct stack trace', () => {
    const error = new CustomError('error message');
    const expected = `CustomError: error message
    at Context.it (${baseDir}/src/abstract-error.spec.ts:42:19)
    at callFn (${baseDir}/node_modules/mocha/lib/runnable.js:387:21)
    at Test.Runnable.run (${baseDir}/node_modules/mocha/lib/runnable.js:379:7)
    at Runner.runTest (${baseDir}/node_modules/mocha/lib/runner.js:525:10)
    at ${baseDir}/node_modules/mocha/lib/runner.js:643:12
    at next (${baseDir}/node_modules/mocha/lib/runner.js:437:14)
    at ${baseDir}/node_modules/mocha/lib/runner.js:447:7
    at next (${baseDir}/node_modules/mocha/lib/runner.js:362:14)
    at Immediate._onImmediate (${baseDir}/node_modules/mocha/lib/runner.js:415:5)
    at runCallback (timers.js:705:18)
    at tryOnImmediate (timers.js:676:5)
    at processImmediate (timers.js:658:5)`;

    assert.strictEqual(error.stack, expected);
  });

  describe('#toString()', () => {
    it('should return the error name only (no message)', () => {
      const error = new CustomError();

      assert.strictEqual(error.toString(), 'CustomError');
    });
    it('should return the error name only (empty message)', () => {
      const error = new CustomError('');

      assert.strictEqual(error.toString(), 'CustomError');
    });
    it('should return the error name and message (with message)', () => {
      const error = new CustomError('error message');

      assert.strictEqual(error.toString(), 'CustomError: error message');
    });
  });
});
