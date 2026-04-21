import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Users, DollarSign, Heart, Utensils, Mountain, Palmtree, Music, ShoppingBag, History, Coffee } from 'lucide-react';

const INTERESTS = [
    { id: 'Culture', icon: <Heart size={16} /> },
    { id: 'Food', icon: <Utensils size={16} /> },
    { id: 'Adventure', icon: <Mountain size={16} /> },
    { id: 'Nature', icon: <Palmtree size={16} /> },
    { id: 'Nightlife', icon: <Music size={16} /> },
    { id: 'Shopping', icon: <ShoppingBag size={16} /> },
    { id: 'History', icon: <History size={16} /> },
    { id: 'Relaxation', icon: <Coffee size={16} /> },
];

const TravelForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        destination: '',
        duration: 3,
        budget: 'Mid-range',
        interests: [],
        dates: '',
        travelers: 'Solo',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleInterest = (id) => {
        setFormData((prev) => {
            const interests = prev.interests.includes(id)
                ? prev.interests.filter((i) => i !== id)
                : [...prev.interests, id];
            return { ...prev, interests };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label><MapPin size={14} /> Destination</label>
                        <input
                            type="text"
                            name="destination"
                            placeholder="e.g. Kyoto, Japan"
                            required
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label><Calendar size={14} /> Duration (Days)</label>
                        <input
                            type="number"
                            name="duration"
                            min="1"
                            max="30"
                            required
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label><DollarSign size={14} /> Budget</label>
                        <select name="budget" value={formData.budget} onChange={handleChange}>
                            <option>Budget</option>
                            <option>Mid-range</option>
                            <option>Luxury</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><Users size={14} /> Travelers</label>
                        <select name="travelers" value={formData.travelers} onChange={handleChange}>
                            <option>Solo</option>
                            <option>Couple</option>
                            <option>Group</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><Calendar size={14} /> Travel Dates (Optional)</label>
                        <input
                            type="date"
                            name="dates"
                            value={formData.dates}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label>Travel Interests</label>
                    <div className="interests-grid">
                        {INTERESTS.map((interest) => (
                            <div
                                key={interest.id}
                                className={`interest-item ${formData.interests.includes(interest.id) ? 'selected' : ''}`}
                                onClick={() => toggleInterest(interest.id)}
                            >
                                {interest.icon}
                                {interest.id}
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Planning...' : (
                        <>
                            Plan My Trip <Plane size={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TravelForm;
