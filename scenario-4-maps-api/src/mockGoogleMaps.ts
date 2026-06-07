// mockGoogleMaps.ts
// Simulates Google Maps Places Autocomplete API behavior.
// Key behavior: some addresses simply return no results (data gap).

export type PlacePrediction = {
  place_id: string;
  description: string;
};

export type PlaceDetails = {
  formatted_address?: string;
  geometry?: { location: { lat: number; lng: number } };
};

// Simulated Places database
// NOTE: Rural/new addresses are intentionally missing — this mimics real Google Maps data gaps
const PLACES_DB: Record<string, PlacePrediction[]> = {
  '123 main': [
    { place_id: 'place_001', description: '123 Main Street, New York, NY 10001, USA' },
    { place_id: 'place_002', description: '123 Main Street, Los Angeles, CA 90012, USA' },
    { place_id: 'place_003', description: '123 Main Street, Chicago, IL 60601, USA' },
  ],
  '456 oak': [
    { place_id: 'place_004', description: '456 Oak Avenue, Boston, MA 02101, USA' },
  ],
  '789': [
    { place_id: 'place_005', description: '789 Broadway, New York, NY 10003, USA' },
  ],
  // These addresses exist but Google has no data for them (new development / rural)
  // '742 evergreen': [], — Simpsons reference ;)
  // '1 rural': [],
};

const PLACE_DETAILS: Record<string, PlaceDetails> = {
  'place_001': { formatted_address: '123 Main Street, New York, NY 10001, USA', geometry: { location: { lat: 40.7128, lng: -74.0060 } } },
  'place_002': { formatted_address: '123 Main Street, Los Angeles, CA 90012, USA', geometry: { location: { lat: 34.0522, lng: -118.2437 } } },
  'place_003': { formatted_address: '123 Main Street, Chicago, IL 60601, USA', geometry: { location: { lat: 41.8781, lng: -87.6298 } } },
  'place_004': { formatted_address: '456 Oak Avenue, Boston, MA 02101, USA', geometry: { location: { lat: 42.3601, lng: -71.0589 } } },
  'place_005': { formatted_address: '789 Broadway, New York, NY 10003, USA', geometry: { location: { lat: 40.7296, lng: -73.9950 } } },
};

let autocompleteCallCount = 0;

/**
 * Simulates Places Autocomplete API.
 * Returns empty array for unknown addresses — this is the bug scenario.
 */
export async function getAutocompletePredictions(input: string): Promise<PlacePrediction[]> {
  autocompleteCallCount++;
  await new Promise((r) => setTimeout(r, 400));

  const normalizedInput = input.toLowerCase().trim();

  // Check if any known address starts with or contains the input
  for (const [key, predictions] of Object.entries(PLACES_DB)) {
    if (key.startsWith(normalizedInput) || normalizedInput.startsWith(key.slice(0, 4))) {
      console.log(`[Maps API] Found ${predictions.length} predictions for "${input}" (call #${autocompleteCallCount})`);
      return predictions;
    }
  }

  // Google simply has no data for this address — NOT a code error
  console.log(`[Maps API] No predictions for "${input}" — address not in Google's database (call #${autocompleteCallCount})`);
  return [];
}

/**
 * Simulates getDetails call after a place is selected.
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  await new Promise((r) => setTimeout(r, 200));
  const details = PLACE_DETAILS[placeId];
  if (!details) {
    // This can happen in real life too
    return {};
  }
  return details;
}
