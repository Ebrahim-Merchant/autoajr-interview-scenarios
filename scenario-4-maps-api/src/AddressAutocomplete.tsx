import { useEffect, useRef, useState } from 'react';
import { getAutocompletePredictions, getPlaceDetails } from './mockGoogleMaps';
import type { PlacePrediction } from './mockGoogleMaps';

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void;
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inputValue || inputValue.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const predictions = await getAutocompletePredictions(inputValue);
        setSuggestions(predictions);
        setShowSuggestions(true);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [inputValue]);

  const handleSelect = async (prediction: PlacePrediction) => {
    setLoading(true);
    setShowSuggestions(false);
    try {
      const details = await getPlaceDetails(prediction.place_id);
      if (details.formatted_address) {
        setInputValue(details.formatted_address);
        onAddressSelect(details.formatted_address);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="Start typing an address..."
        disabled={loading}
      />
      {loading && <div style={{ fontSize: 12, color: '#888' }}>Looking up address...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s) => (
            <div key={s.place_id} className="suggestion" onMouseDown={() => handleSelect(s)}>
              📍 {s.description}
            </div>
          ))}
        </div>
      )}
      {showSuggestions && suggestions.length === 0 && !loading && inputValue.length >= 3 && (
        <div className="no-results">No suggestions found</div>
      )}
    </div>
  );
}
