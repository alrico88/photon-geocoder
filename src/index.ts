import type { Feature, FeatureCollection, Point } from './helpers/geojson';

export { search, type SearchOptions } from './modules/search';
export { reverseGeocode } from './modules/reverse';
export { createPhoton, type PhotonClient } from './modules/createPhoton';
export type { RequestOptions } from './helpers/api';

/**
 * A helper function to extract data from the FeatureCollection result
 *
 * @export
 * @param {FeatureCollection<Point>} featureCollection The FeatureCollection to extract data from
 * @return {Feature<Point>[]}
 */
export function asSimpleArray(featureCollection: FeatureCollection<Point>): Feature<Point>[] {
  return featureCollection.features;
}
