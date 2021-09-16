import { reverseGeocode, search } from '../src/index';

describe('Test geosearch', () => {
  test('Should return a GeoJSON FeatureCollection', async () => {
    const call = await search('Madrid');

    expect(call.type).toBe('FeatureCollection');
  });

  test('Limit should return a max of N numbers', async() => {
    const call = await search('Madrid', {
      limit: 1,
      language: 'it'
    });

    expect(call.features.length).toBe(1);
  })
});

describe('Test reverse geocoding', () => {
  test('It should return a FeatureCollection', async () => {
    const call = await reverseGeocode(40.433143, -3.681369);

    expect(call.type).toBe('FeatureCollection');
  })
})