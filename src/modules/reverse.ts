import { getJSON, getRootUrl, RequestOptions } from '../helpers/api';
import { FeatureCollection, Point } from '../helpers/geojson';

/**
 * Geocodes a latitude, longitude
 *
 * @export
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @param {RequestOptions} [options] Options to use for the request
 * @return {Promise<FeatureCollection<Point>>} The geocoded Point FeatureCollection
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
  options?: RequestOptions,
): Promise<FeatureCollection<Point>> {
  const query = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
  });

  const url = `${getRootUrl(options?.photonUrl)}/reverse?${query}`;

  return getJSON(url, options?.signal);
}
