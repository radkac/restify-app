import { results } from '../results';
import { errorHandler } from './setup';

test('Create result', async done => {
  // const fakeConnection: any = {
  //   query: jest.fn()
  //     .mockImplementation((callback) => {
  //       callback(undefined, { user: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { id: '1' } } });
  //     }),
  // };
  const fakeResults = results(errorHandler);

  const saveResult = await fakeResults.save({ id: 1 }, { statusCode: '200' });

  expect(saveResult)
    .toBe('1');
  done();
});
