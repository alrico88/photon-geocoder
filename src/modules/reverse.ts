import { stringify } from 'qs';
import axios from 'axios';
import { baseURL } from '../helpers/api';
import { FeatureCollection, Point } from '../helpers/geojson';

/**
 * Geocodes a latitude, longitude
 *
 * @export
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @return {Promise<FeatureCollection<Point>>} The geocoded Point FeatureCollection
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<FeatureCollection<Point>> {
  const obj = {
    lat,
    lon,
  };

  const url = `${baseURL}/reverse?${stringify(obj)}`;

  const response = await axios.get(url);

  return response.data;
}
