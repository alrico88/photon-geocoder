import { baseURL, RequestOptions } from '../helpers/api';
import { FeatureCollection, Point } from '../helpers/geojson';
import { reverseGeocode } from './reverse';
import { search, SearchOptions } from './search';

export interface PhotonClient {
  search: (
    searchTerm: string,
    options?: Omit<SearchOptions, 'photonUrl'>,
  ) => Promise<FeatureCollection<Point>>;
  reverseGeocode: (
    lat: number,
    lon: number,
    options?: Omit<RequestOptions, 'photonUrl'>,
  ) => Promise<FeatureCollection<Point>>;
}

/**
 * Creates a client bound to a Photon instance
 *
 * @export
 * @param {string} [photonUrl=baseURL] Custom Photon instance URL, if needed
 * @return {PhotonClient} The client, whose methods can be destructured
 */
export function createPhoton(photonUrl: string = baseURL): PhotonClient {
  return {
    search: (searchTerm, options) => search(searchTerm, { ...options, photonUrl }),
    reverseGeocode: (lat, lon, options) => reverseGeocode(lat, lon, { ...options, photonUrl }),
  };
}
