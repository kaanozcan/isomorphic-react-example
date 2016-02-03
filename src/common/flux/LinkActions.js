class LinkActions {
  getLinks(type) {
    return {type, id: type + "some id"};
  }
  cancelGetLinks(id) {
    return id;
  }
  getLinksSuccess(data) {
    return data;
  }
  getLinksError(data) {
    return data;
  }
}

export default LinkActions;
