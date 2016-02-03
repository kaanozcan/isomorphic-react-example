const { browser, env: { BROWSER,  NODE_ENV } } = process;

class AltResolver {

  constructor(){
    this.firstRender = true;
    this.pendingActions = {};

    this.resolve = this.resolve.bind(this);
  }

  resolve(id, action, setImmediate = (NODE_ENV === 'test')) {
    if (((BROWSER || browser) && !this.firstRender) || setImmediate) {
      return new Promise(action);
    }

    this.pendingActions[id] = action;
  }

  cancelResolve(id){
    this.pendingActions[id].cancel();
  }

  dispatchPendingActions() {
    let promiseList = Object.keys(this.pendingActions).map((key) => {
      return this.makeCancelable(this.pendingActions[key]).promise
    });

    return new Promise((done) => {
      Promise
        .all(promiseList)
        .catch(err => promiseList)
        .then(result => done(result));
    });
  }

  makeCancelable(action){
    let hasCanceled_ = false;

    return {
      promise: new Promise((resolve, reject) => {
        const promise = new Promise(action);

        promise.then(r => hasCanceled_ ? reject({isCanceled: true}) : resolve(r));
      }),
      cancel() {
        hasCanceled_ = true;
      }
    }
  }
}

export default AltResolver
