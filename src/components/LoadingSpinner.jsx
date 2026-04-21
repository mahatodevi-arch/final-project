import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="airplane-spinner">✈️</div>
            <h2 style={{ marginTop: '2rem', color: 'var(--primary)' }}>Planning your dream trip...</h2>
            <p style={{ color: 'var(--text-muted)' }}>Our AI is finding the best spots for you</p>
        </div>
    );
};

export default LoadingSpinner;
