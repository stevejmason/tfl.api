var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);

var URL = 'https://api.tfl.gov.uk/BikePoint';

module.exports = function (appId, appKey) {
  var auth = { app_id: appId, app_key: appKey };

  function all() {
    return superagent
      .get(URL)
      .query(auth);
  }

  function point(id) {
    return superagent
      .get(`${URL}/${id}`)
      .query(auth);
  }

  function search(query) {
    return superagent
      .get(`${URL}/search`)
      .query(auth)
      .query({ query });
  }

  return {
    all,
    point,
    search,
  };
};
