import React, { useState, useRef } from 'react';

export default function HeroVideo() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // no loop restriction — let video play naturally

  return (
    <div className="absolute inset-0 z-0">
      {!videoError ? (
        <>
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            style={{ filter: 'contrast(0.75) brightness(1.05) saturate(0.7) sepia(0.15)' }}
            className="absolute inset-0 w-full h-full object-cover scale-100"
            poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            onError={() => setVideoError(true)}
          >
            <source src="https://cdn.coverr.co/videos/coverr-law-books-and-gavel-8036/1080p.mp4" type="video/mp4" />
          </video>
          {/* Grain + texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.08,
            }}
          />
          {/* White matte overlay */}
          <div className="absolute inset-0 bg-white/15 pointer-events-none" />
          {/* Additional white overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/8 pointer-events-none" />
        </>
      ) : (
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/75" />
    </div>
  );
}
