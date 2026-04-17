import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { movies } from '../data/movies';

export default function Home() {
  return (
    <div className="page-wrapper container">
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Now <span className="text-gradient">Showing</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
            <div className="card movie-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', paddingTop: '150%', overflow: 'hidden' }}>
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition)' }}
                  className="movie-poster"
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '600' }}>{movie.rating}</span>
                </div>
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>{movie.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{movie.genre}</p>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.875rem' }}>
                  <Play size={16} /> View Details
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .movie-card:hover .movie-poster {
          transform: scale(1.05);
        }
        .movie-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
