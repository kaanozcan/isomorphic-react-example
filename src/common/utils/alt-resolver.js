const { browser, env: { BROWSER,  NODE_ENV } } = process;

class AltResolver {

  constructor(){
    this.firstRender = true;
    this.pendingActions = {};
    this.cancelables = {};

    this.resolve = this.resolve.bind(this);
    this.cancelResolve = this.cancelResolve.bind(this);
  }

  resolve(id, action, setImmediate = (NODE_ENV === 'test')) {
    if (((BROWSER || browser) && !this.firstRender) || setImmediate) {
      const cancelable = this.cancelables[id] = this.makeCancelable(action);
      return cancelable.promise;
    }

    this.pendingActions[id] = action;
  }

  cancelResolve(id) {
    this.cancelables[id].cancel();
  }

  dispatchPendingActions() {
    let promiseList = Object.getOwnPropertySymbols(this.pendingActions).map((key) => {
      return this.makeCancelable(this.pendingActions[key]).promise
    });

    return new Promise((done) => {
      Promise
        .all(promiseList)
        .then(result => done(result));
    });
  }

  makeCancelable(action){
    return {
      hasCanceled: false,
      promise: new Promise((resolve, reject) => {
        const promise = new Promise(action);

        promise.then(r => this.hasCanceled ? reject({isCanceled: true}) : resolve(r));
      }),
      cancel() {
        this.hasCanceled = true;
      }
    }
  }
}

export default AltResolver
