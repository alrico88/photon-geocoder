export interface Point {
  type: 'Point',
  coordinates: [number, number],
}

export interface Feature<T> {
  type: 'Feature',
  geometry: T,
  properties: Record<string, any>
}

export interface FeatureCollection<T> {
  type: 'FeatureCollection',
  features: Feature<T>[],
}
