import is from '@sindresorhus/is';
import { FeatureCollection, Point } from '../helpers/geojson';
import { PhotonSupportedLanguage, RequestOptions, getJSON, getRootUrl } from '../helpers/api';

export interface SearchOptions extends RequestOptions {
  priority?: [number, number];
  language?: PhotonSupportedLanguage;
  limit?: number;
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
  const query = new URLSearchParams({ q: searchTerm });

  if (!is.undefined(options)) {
    if (!is.falsy(options.language)) {
      query.set('lang', options.language);
    }

    if (!is.falsy(options.limit)) {
      query.set('limit', String(options.limit));
    }

    if (!is.falsy(options.priority) && is.array(options.priority)) {
      const [lon, lat] = options.priority;

      query.set('lat', String(lat));
      query.set('lon', String(lon));
    }
  }

  const url = `${getRootUrl(options?.photonUrl)}/api/?${query}`;

  return getJSON(url, options?.signal);
}
