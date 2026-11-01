import { afterEach, beforeEach, describe, expect, test, vi } from 'vite-plus/test';
import { createPhoton, reverseGeocode, search } from '../src/index';

const photonUrl = 'https://photon.example.com';

function mockFetch() {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => Response.json({ type: 'FeatureCollection', features: [] }));
}

describe('Test requests', () => {
  let fetchSpy: ReturnType<typeof mockFetch>;

  const requestedUrls = () => fetchSpy.mock.calls.map(([url]) => url);

  beforeEach(() => {
    fetchSpy = mockFetch();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Search should return a GeoJSON FeatureCollection', async () => {
    const call = await search('Madrid');

    expect(call.type).toBe('FeatureCollection');
    expect(requestedUrls()).toEqual(['https://photon.komoot.io/api/?q=Madrid']);
  });

  test('Search should send its options as query strings', async () => {
    await search('Madrid', { limit: 1, language: 'fr', priority: [-3.6, 40.4] });

    expect(requestedUrls()).toEqual([
      'https://photon.komoot.io/api/?q=Madrid&lang=fr&limit=1&lat=40.4&lon=-3.6',
    ]);
  });

  test('Search should encode its term', async () => {
    await search('Plaza de España & Co');

    expect(requestedUrls()).toEqual([
      'https://photon.komoot.io/api/?q=Plaza+de+Espa%C3%B1a+%26+Co',
    ]);
  });

  test('Reverse geocoding should return a FeatureCollection', async () => {
    const call = await reverseGeocode(40.433143, -3.681369);

    expect(call.type).toBe('FeatureCollection');
    expect(requestedUrls()).toEqual([
      'https://photon.komoot.io/reverse?lat=40.433143&lon=-3.681369',
    ]);
  });

  test('It should use a custom instance url', async () => {
    await search('Madrid', { photonUrl });
    await reverseGeocode(1, 2, { photonUrl: `${photonUrl}/` });

    expect(requestedUrls()).toEqual([
      `${photonUrl}/api/?q=Madrid`,
      `${photonUrl}/reverse?lat=1&lon=2`,
    ]);
  });

  test('A client should keep its url when destructured', async () => {
    const client = createPhoton(`${photonUrl}/`);
    const { search: clientSearch, reverseGeocode: clientReverse } = client;
    const { signal } = new AbortController();

    await clientSearch('Madrid', { limit: 1 });
    await clientReverse(1, 2, { signal });

    expect(fetchSpy.mock.calls).toEqual([
      [`${photonUrl}/api/?q=Madrid&limit=1`, { signal: undefined }],
      [`${photonUrl}/reverse?lat=1&lon=2`, { signal }],
    ]);
  });

  test('It should reject on a non-2xx response', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 500 }));

    await expect(search('Madrid')).rejects.toThrow('status 500');
  });
});

describe('Test aborting', () => {
  test('It should reject when the signal is aborted', async () => {
    const options = { signal: AbortSignal.abort() };

    await expect(search('Madrid', options)).rejects.toMatchObject({ name: 'AbortError' });
    await expect(reverseGeocode(40.433143, -3.681369, options)).rejects.toMatchObject({
      name: 'AbortError',
    });
  });

  test('It should abort a request in flight', async () => {
    const controller = new AbortController();
    const call = search('Madrid', { signal: controller.signal });

    controller.abort();

    await expect(call).rejects.toMatchObject({ name: 'AbortError' });
  });
});
