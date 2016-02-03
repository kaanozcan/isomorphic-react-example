class LinkStore {
  constructor(){
    this.hotLinks = {};
    this.newLinks = {};

    const LinkActions = this.LinkActions = this.alt.getActions("LinkActions");

    this.bindListeners({
      getLinks: LinkActions.GET_LINKS,
      getLinksSuccess: LinkActions.GET_LINKS_SUCCESS,
      getLinksError: LinkActions.GET_LINKS_ERROR,
      cancelGetLinks: LinkActions.CANCEL_GET_LINKS
    });
  }

  getLinks({type, id}) {
    this.alt.resolve(id, (done) => {
      const url = `https://www.reddit.com/r/javascript/${type}.json` ;

      this.alt.request({url, isOut: true}).then((response) => {
        return response.json();
      }).then((data) => {
        this.LinkActions.getLinksSuccess({type, data});
        done();
      }, (err) => {
        this.LinkActions.getLinksError({type, err});
        done();
      });
    });
  }

  cancelGetLinks(id) {

  }

  getLinksSuccess({type, data}) {
    this[type + "Links"] = data;
  }

  getLinksError({type, err}) {
    this[type + "Links"] = {
      error: true,
      message: err
    };
  }
}

export default LinkStore;
