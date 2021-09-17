# photon-geocoder

A simple wrapper for Photon API by [komoot](https://www.komoot.de/). Search for a place or perform a reverse lookup.

This is an unofficial client, not affiliated with komoot in any way.

## Installation

Using npm:

`npm i photon-geocoder`

Using yarn:

`yarn add photon-geocoder`

## Table of contents

### Interfaces

- [SearchOptions](interfaces/SearchOptions.md)

### Functions

- [asSimpleArray](#assimplearray)
- [reverseGeocode](#reversegeocode)
- [search](#search)

## Functions

### asSimpleArray

▸ **asSimpleArray**(`featureCollection`): `Feature`<`Point`\>[]

A helper function to extract data from the FeatureCollection result

**`export`**

#### Parameters

| Name                | Type                          | Description                                |
| :------------------ | :---------------------------- | :----------------------------------------- |
| `featureCollection` | `FeatureCollection`<`Point`\> | The FeatureCollection to extract data from |

#### Returns

`Feature`<`Point`\>[]

---

### reverseGeocode

▸ **reverseGeocode**(`lat`, `lon`): `Promise`<`FeatureCollection`<`Point`\>\>

Geocodes a latitude, longitude

**`export`**

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `lat` | `number` | Latitude    |
| `lon` | `number` | Longitude   |

#### Returns

`Promise`<`FeatureCollection`<`Point`\>\>

The geocoded Point FeatureCollection

---

### search

▸ **search**(`searchTerm`, `options?`): `Promise`<`FeatureCollection`<`Point`\>\>

Searches for a place

**`export`**

#### Parameters

| Name         | Type                                           | Description             |
| :----------- | :--------------------------------------------- | :---------------------- |
| `searchTerm` | `string`                                       | Search term to look for |
| `options?`   | [`SearchOptions`](interfaces/SearchOptions.md) | -                       |

#### Returns

`Promise`<`FeatureCollection`<`Point`\>\>

The FeatureCollection with the results
