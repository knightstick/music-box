// Example Track:
// {
//   "album": {
//     "album_type": "compilation",
//     "total_tracks": 9,
//     "available_markets": [
//       "CA",
//       "BR",
//       "IT"
//     ],
//     "external_urls": {
//       "spotify": "string"
//     },
//     "href": "string",
//     "id": "2up3OPMp9Tb4dAKM2erWXQ",
//     "images": [
//       {
//         "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
//         "height": 300,
//         "width": 300
//       }
//     ],
//     "name": "string",
//     "release_date": "1981-12",
//     "release_date_precision": "year",
//     "restrictions": {
//       "reason": "market"
//     },
//     "type": "album",
//     "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
//     "copyrights": [
//       {
//         "text": "string",
//         "type": "string"
//       }
//     ],
//     "external_ids": {
//       "isrc": "string",
//       "ean": "string",
//       "upc": "string"
//     },
//     "genres": [
//       "Egg punk",
//       "Noise rock"
//     ],
//     "label": "string",
//     "popularity": 0,
//     "album_group": "compilation",
//     "artists": [
//       {
//         "external_urls": {
//           "spotify": "string"
//         },
//         "href": "string",
//         "id": "string",
//         "name": "string",
//         "type": "artist",
//         "uri": "string"
//       }
//     ]
//   },
//   "artists": [
//     {
//       "external_urls": {
//         "spotify": "string"
//       },
//       "followers": {
//         "href": "string",
//         "total": 0
//       },
//       "genres": [
//         "Prog rock",
//         "Grunge"
//       ],
//       "href": "string",
//       "id": "string",
//       "images": [
//         {
//           "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
//           "height": 300,
//           "width": 300
//         }
//       ],
//       "name": "string",
//       "popularity": 0,
//       "type": "artist",
//       "uri": "string"
//     }
//   ],
//   "available_markets": [
//     "string"
//   ],
//   "disc_number": 0,
//   "duration_ms": 0,
//   "explicit": true,
//   "external_ids": {
//     "isrc": "string",
//     "ean": "string",
//     "upc": "string"
//   },
//   "external_urls": {
//     "spotify": "string"
//   },
//   "href": "string",
//   "id": "string",
//   "is_playable": true,
//   "linked_from": {},
//   "restrictions": {
//     "reason": "string"
//   },
//   "name": "string",
//   "popularity": 0,
//   "preview_url": "string",
//   "track_number": 0,
//   "type": "track",
//   "uri": "string",
//   "is_local": true
// }

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type LinkedFrom = {};

export type Restrictions = {
  reason: string;
};

export type Followers = {
  href: string;
  total: number;
};

export const search = async (query: string, accessToken: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.tracks;
};

export const getTrack = async (
  id: string,
  accessToken: string
): Promise<Track> => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};
