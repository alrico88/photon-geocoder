export type PhotonSupportedLanguage = 'default' | 'en' | 'de' | 'fr' | 'it';

export const baseURL = 'https://photon.komoot.io';

export interface RequestOptions {
  signal?: AbortSignal;
  photonUrl?: string;
}

/**
 * Gets the URL requests should start from
 *
 * @export
 * @param {string} [photonUrl=baseURL] Custom Photon instance URL, if needed
 * @return {string} The URL without trailing slashes
 */
export function getRootUrl(photonUrl: string = baseURL): string {
  return photonUrl.replace(/\/+$/, '');
}

/**
 * Requests a Photon URL and parses its JSON response
 *
 * @export
 * @template T
 * @param {string} url The URL to request
 * @param {AbortSignal} [signal] Signal to abort the request
 * @return {Promise<T>} The parsed response
 */
export async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Photon request failed with status ${response.status}`);
  }

  return response.json();
}
