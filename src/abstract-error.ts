/**
 * Sets the correct prototype on the error instance. This needs to be done in order to
 * extend native JS Error class and still work with `instanceof` operations
 */
function fixPrototype(instance: AbstractError, actualProto: typeof AbstractError.prototype) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(instance, actualProto);
  } else {
    (instance as any).__proto__ = actualProto;
  }
}

/**
 * AbstractError Class
 *
 * @class AbstractError
 */
abstract class AbstractError extends Error {
  /**
   * AbstractError Constructor
   *
   * This class is intended to be extended with your application's custom Errors in order
   * to ease in creating and handling custom errors thrown from within your application
   *
   * @notes
   *
   *  1. `this.name` must be set to the concrete class name for accurate stacktrace
   *  2. `this.stack` is captured manually from an inner Error stack for browser compatibility/accuracy
   *  3. `Error.captureStackTrace` not used due to only being available on V8, and incorrect line numbers post-transpile
   *  4. instance prototype must be reset to ensure correct custom error members
   *
   * @see https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216 (original solution)
   * @see https://stackoverflow.com/questions/41102060/typescript-extending-error-class (fix prototype)
   */
  public constructor(message?: string) {
    super(message);

    fixPrototype(this, new.target.prototype);

    this.name = this.constructor.name;
    this.stack = this.captureStackTrace();
  }

  private captureStackTrace() {
    const stacktrace = new Error().stack || '';
    const frames = stacktrace.split('\n');
    const slicePosition = frames.findIndex(frame => frame.trim().startsWith(`at new ${this.name}`));
    const realStacktrace = frames.slice(slicePosition + 1).join('\n');

    return `${this.toString()}\n${realStacktrace}`;
  }
}

export default AbstractError;
export { AbstractError };
