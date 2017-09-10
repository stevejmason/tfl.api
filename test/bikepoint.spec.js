import chai from 'chai';
import ChaiString from 'chai-string';
import BikePoint from '../src/bikepoint';

chai.use(ChaiString);

describe('BikePoint', () => {
  const appId = '12345';
  const appKey = 'abcdef';
  const bikepoint = BikePoint(appId, appKey);
  const { expect } = chai;

  it('should expose itself as a function', () => {
    expect(BikePoint).to.be.function;
  });

  it('should contain all function when bound with credentials', () => {
    expect(bikepoint.all).to.be.function;
  });

  it('should contain point function when bound with credentials', () => {
    expect(bikepoint.point).to.be.function;
  });

  it('should contain search function when bound with credentials', () => {
    expect(bikepoint.search).to.be.function;
  });

  it('should pass through authentication details to endpoints', () => {
    const reqs = [bikepoint.all(), bikepoint.search('Kings Cross'), bikepoint.point()];

    for (const req of reqs) {
      expect(req.qs).to.have.property('app_id', appId);
      expect(req.qs).to.have.property('app_key', appKey);
    }
  });

  it('should add id to the end of the point request url', () => {
    const id = '123abcxyz';
    const req = bikepoint.point(id);

    expect(req.url).to.endWith(`/${id}`);
  });

  it('should contain the search query', () => {
    const q = 'london kings cross';
    const req = bikepoint.search(q);

    expect(req.qs).to.have.property('query', q);
  });

});
