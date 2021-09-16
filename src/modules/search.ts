import axios from 'axios';
import is from '@sindresorhus/is';
import { stringify } from 'qs';
import { FeatureCollection, Point } from '../helpers/geojson';
import { PhotonSupportedLanguage, PhotonQueryStrings, baseURL } from '../helpers/api';

export interface SearchOptions {
  priority?: [number, number],
  language?: PhotonSupportedLanguage,
  limit?: number,
}

/**
 * Searches for a place
 *
 * @export
 * @param {string} searchTerm Search term to look for
 * @param {SearchOptions} [options] Options to use for thr query
 * @return {Promise<FeatureCollection<Point>>} The FeatureCollection with the results
 */
export async function search(
  searchTerm: string,
  options?: SearchOptions,
): Promise<FeatureCollection<Point>> {
  const query: PhotonQueryStrings = {
    q: searchTerm,
  };

  if (!is.undefined(options)) {
    if (!is.falsy(options.language)) {
      query.lang = options.language;
    }

    if (!is.falsy(options.limit)) {
      query.limit = options.limit;
    }

    if (!is.falsy(options.priority) && is.array(options.priority)) {
      const [lon, lat] = options.priority;

      query.lat = lat;
      query.lon = lon;
    }
  }

  const url = `${baseURL}/api/?${stringify(query)}`;

  const response = await axios.get(url);

  return response.data;
}
