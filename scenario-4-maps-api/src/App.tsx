import { useState } from 'react';
import { AddressAutocomplete } from './AddressAutocomplete';

// Test addresses to try:
// ✅ Works:    "123 Main" → shows suggestions
// ✅ Works:    "456 Oak"  → shows suggestions
// ✅ Works:    "789"      → shows suggestions
// ❌ Fails:   "742 Evergreen" → no suggestions (rural address, not in Google's database)
// ❌ Fails:   "1 Country Road" → no suggestions (new development)
// ❌ Fails:   "99 Nowhere Lane" → no suggestions

export default function App() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <div>
      <h2>Delivery Address</h2>

      <div className="hint">
        💡 Open the browser console to see API calls.
        <br />
        Try these addresses to reproduce the client's complaint:
        <br />
        <strong>Works:</strong> "123 Main" or "456 Oak"
        <br />
        <strong>Fails:</strong> "742 Evergreen" or "1 Country Road" or "99 Nowhere Lane"
        <br />
        <small>
          After reproducing: Is this a code bug? A configuration problem? Something else?
        </small>
      </div>

      <AddressAutocomplete onAddressSelect={(addr) => setSelectedAddress(addr)} />

      {selectedAddress && (
        <div className="result-card">
          <h4>Selected Address:</h4>
          <p style={{ margin: 0 }}>{selectedAddress}</p>
        </div>
      )}

      <div style={{ marginTop: 32, padding: 16, background: '#f8f9fa', borderRadius: 8, fontSize: 13, color: '#555' }}>
        <strong>Investigation checklist:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li>Check the console — what does the API return for failing addresses?</li>
          <li>Is there an error? Or just empty results?</li>
          <li>Does the API key / quota seem relevant?</li>
          <li>Can you reproduce with specific addresses?</li>
          <li>Is the code broken, or is something else causing this?</li>
        </ul>
      </div>
    </div>
  );
}
