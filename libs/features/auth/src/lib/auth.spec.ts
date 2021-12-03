import { featuresAuth } from './auth';

describe('featuresAuth', () => {
  it('should work', () => {
    expect(featuresAuth()).toEqual('features-auth');
  });
});
