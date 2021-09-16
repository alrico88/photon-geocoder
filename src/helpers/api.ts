export type PhotonSupportedLanguage = 'default' | 'en' | 'de' | 'fr' | 'it';

export interface PhotonQueryStrings {
  q: string,
  limit?: number,
  lang?: PhotonSupportedLanguage,
  lat?: number,
  lon?: number,
}

export const baseURL = 'http://photon.komoot.io';
