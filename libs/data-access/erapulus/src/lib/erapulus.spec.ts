import { dataAccessErapulus } from './erapulus';

describe('dataAccessErapulus', () => {
  it('should work', () => {
    expect(dataAccessErapulus()).toEqual('data-access-erapulus');
  });
});
