import React from 'react';
import { Clock, MapPin, Utensils, Info, Calendar, RefreshCcw, DollarSign } from 'lucide-react';

const ItineraryDisplay = ({ data, onRegenerate }) => {
    if (!data) return null;

    return (
        <div className="itinerary-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Your Trip to {data.destination}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Best time to visit: {data.bestTimeVisit}</p>
                </div>
                <button onClick={onRegenerate} className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                    <RefreshCcw size={18} /> Regenerate
                </button>
            </div>

            {data.itinerary.map((day) => (
                <div key={day.day} className="day-card">
                    <div className="day-header">
                        <h3>Day {day.day}: {day.title}</h3>
                    </div>

                    <div className="time-slot">
                        <div className="slot-label">Morning</div>
                        <div style={{ fontWeight: 600 }}>{day.morning.activity} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({day.morning.duration})</span></div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{day.morning.description}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>Est. Cost: {day.morning.cost}</div>
                    </div>

                    <div className="time-slot">
                        <div className="slot-label">Afternoon</div>
                        <div style={{ fontWeight: 600 }}>{day.afternoon.activity} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({day.afternoon.duration})</span></div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{day.afternoon.description}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>Est. Cost: {day.afternoon.cost}</div>
                    </div>

                    <div className="time-slot">
                        <div className="slot-label">Evening</div>
                        <div style={{ fontWeight: 600 }}>{day.evening.activity} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({day.evening.duration})</span></div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{day.evening.description}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>Est. Cost: {day.evening.cost}</div>
                    </div>

                    <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div className="slot-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Utensils size={14} /> Recommended Food
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                            {day.foodSuggestions.map((food, idx) => (
                                <div key={idx} style={{ fontSize: '0.9rem' }}>
                                    <strong>{food.name}</strong> ({food.cuisine}) - <span style={{ color: 'var(--accent)' }}>{food.priceRange}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="itinerary-summary">
                <h3 style={{ marginBottom: '1rem' }}><Info size={20} /> Travel Summary & Tips</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                    <div>
                        <div className="slot-label"><DollarSign size={14} /> Total Estimated Cost</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{data.totalEstimatedCost}</div>
                    </div>
                    <div>
                        <div className="slot-label">Pro Tips</div>
                        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {data.travelTips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDisplay;
