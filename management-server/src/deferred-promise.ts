/*
 * Adapted GitHub Gist fork from:
 * https://gist.github.com/GFoley83/5877f6c09fbcfd62569c51dc91444cf0
 */

/**
 * A new instance of deferred is constructed by calling
 * `new DeferredPromise<T>()`. The purpose of the deferred object is to
 * expose the associated Promise instance APIs that can be used for
 * signalling the successful or unsuccessful completion, as well as the state
 * of the task.
 *
 * ```ts
 * const deferred = new DeferredPromise<string>();
 * console.log(deferred.state); // 'pending'
 *
 * deferred
 * .then(str => console.log(str))
 * .catch(err => console.error(err));
 *
 * deferred.resolve('Foo');
 * console.log(deferred.state); // 'fulfilled'
 * // deferred.reject('Bar');
 * ```
 */
export default class DeferredPromise<T> implements Promise<T> {
    [Symbol.toStringTag]: "Promise";

    private _promise: Promise<T>;
    private _resolve: (value: T | PromiseLike<T>) => void;
    private _reject: (reason?: unknown) => void;
    private _state: "pending" | "fulfilled" | "rejected" = "pending";

    public get state(): "pending" | "fulfilled" | "rejected" {
        return this._state;
    }

    constructor() {
        this._resolve = () => {
            /* placeholder */
        };
        this._reject = () => {
            /* placeholder */
        };
        this._promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    public then<TResult1, TResult2>(
        onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
        onrejected?: (reason: unknown) => TResult2 | PromiseLike<TResult2>
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    public catch<TResult>(
        onrejected?: (reason: unknown) => TResult | PromiseLike<TResult>
    ): Promise<T | TResult> {
        return this._promise.catch(onrejected);
    }

    public finally(onfinally?: () => void): Promise<T> {
        return this._promise.finally(onfinally);
    }

    public resolve(value: T | PromiseLike<T>): void {
        this._resolve(value);
        this._state = "fulfilled";
    }

    public reject(reason: unknown): void {
        this._reject(reason);
        this._state = "rejected";
    }
}
