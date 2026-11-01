# photon-geocoder

A simple wrapper for Photon API by [komoot](https://www.komoot.de/). Search for a place or perform a reverse lookup.

This is an unofficial client, not affiliated with komoot in any way.

You can point to their hosted service or a custom instance url.

Requests use native `fetch`, so it needs Node.js 22 or later, or a modern browser.

## Installation

```sh
npm i photon-geocoder
```

## Usage

```ts
import { asSimpleArray, reverseGeocode, search } from 'photon-geocoder';

const results = await search('Madrid', { limit: 5, language: 'en' });
const places = asSimpleArray(results);

const place = await reverseGeocode(40.433143, -3.681369);
```

## Custom instance

Pass `photonUrl` in the options of a call:

```ts
import { search } from 'photon-geocoder';

const results = await search('Madrid', { photonUrl: 'https://photon.example.com' });
```

Or create a client to use the same url in every call:

```ts
import { createPhoton } from 'photon-geocoder';

const { search, reverseGeocode } = createPhoton('https://photon.example.com');

const results = await search('Madrid', { limit: 1 });
const place = await reverseGeocode(40.433143, -3.681369);
```

## Aborting a request

Both `search` and `reverseGeocode` accept an `AbortSignal`:

```ts
import { reverseGeocode, search } from 'photon-geocoder';

const controller = new AbortController();

const results = search('Madrid', { signal: controller.signal });
const place = reverseGeocode(40.433143, -3.681369, { signal: AbortSignal.timeout(5000) });

controller.abort();
```

An aborted request rejects with the signal's reason, an `AbortError` by default. A non-2xx response also rejects, with an `Error`.

## API

### search(searchTerm, options?)

Searches for a place. Returns a `Promise` with a GeoJSON `FeatureCollection` of points.

| Option      | Type               | Description                               |
| :---------- | :----------------- | :---------------------------------------- |
| `limit`     | `number`           | Maximum number of results                 |
| `language`  | `string`           | Language of the results                   |
| `priority`  | `[number, number]` | `[lon, lat]` to prioritize results around |
| `signal`    | `AbortSignal`      | Signal to abort the request               |
| `photonUrl` | `string`           | Custom Photon instance URL                |

### reverseGeocode(lat, lon, options?)

Geocodes a latitude and longitude. Returns a `Promise` with a GeoJSON `FeatureCollection` of points.

| Option      | Type          | Description                 |
| :---------- | :------------ | :-------------------------- |
| `signal`    | `AbortSignal` | Signal to abort the request |
| `photonUrl` | `string`      | Custom Photon instance URL  |

### createPhoton(photonUrl?)

Creates a client with `search` and `reverseGeocode` bound to a Photon instance. They take the same options, except `photonUrl`.

### asSimpleArray(featureCollection)

Returns the features of a `FeatureCollection` as an array.
