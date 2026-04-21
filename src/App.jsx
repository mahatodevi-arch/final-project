import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateItinerary } from './api/anthropic';
import { Key } from 'lucide-react';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);

  const handlePlanTrip = async (formData) => {
    if (!apiKey) {
      alert('Please enter your Anthropic API Key first!');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateItinerary(formData, apiKey);
      setItinerary(result);
      // Scroll to itinerary
      setTimeout(() => {
        document.querySelector('.itinerary-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Failed to generate itinerary. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setItinerary(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}

      <header className="hero">
        <div className="container">
          <h1>Travel Now AI</h1>
          <p>Tell us where you want to go, and our AI will craft the perfect itinerary for you.</p>
        </div>
      </header>

      <main className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="planner-card" style={{ marginTop: '-4rem', marginBottom: '2rem' }}>
            {/* API Key Input (Simplified for demo) */}
            {!itinerary && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <Key size={18} color="var(--text-muted)" />
                <input
                  type="password"
                  placeholder="Enter Anthropic API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ border: 'none', padding: '0.25rem', width: '100%', outline: 'none', background: 'transparent' }}
                />
              </div>
            )}
            <TravelForm onSubmit={handlePlanTrip} isLoading={isLoading} />
          </div>

          {itinerary && (
            <ItineraryDisplay
              data={itinerary}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2026 Travel Now AI. Powered by Anthropic Claude.</p>
      </footer>
    </div>
  );
}

export default App;
