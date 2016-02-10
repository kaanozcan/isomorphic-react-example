import Alt from "alt"

import AltResolver from "../utils/alt-resolver"
import RequestHelper from "../utils/request-helper"

import LinkActions from "./LinkActions.js"
import LinkStore from "./LinkStore.js"

class Flux extends Alt {
  constructor(config) {
    super(config);

    this.resolver = new AltResolver();
    this.resolve = this.resolver.resolve;
    this.cancelResolve = this.resolver.cancelResolve;

    this.RequestHelper = new RequestHelper();
    this.request = this.RequestHelper.request;

    LinkActions.alg = this;

    this.addActions("LinkActions", LinkActions);
    this.addStore("LinkStore", LinkStore);

  }
}

export default Flux;
