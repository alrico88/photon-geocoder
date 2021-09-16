import { Feature, FeatureCollection, Point } from './helpers/geojson';

export { search, SearchOptions } from './modules/search';
export { reverseGeocode } from './modules/reverse';

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
