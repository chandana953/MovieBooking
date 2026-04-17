import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Video, Ticket } from 'lucide-react';
import { movies } from '../data/movies';

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);

  if (!movie) return <div className="container page-wrapper">Movie not found</div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={movie.banner} 
          alt={movie.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, var(--bg-dark), transparent)', height: '100%' }}></div>
        
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
          <img 
            src={movie.image} 
            alt={movie.title}
            style={{ width: '200px', borderRadius: 'var(--border-radius)', boxShadow: '0 10px 30px rgba(0,0,0,0.8)', border: '2px solid rgba(255,255,255,0.1)' }}
            className="detail-poster"
          />
          <div style={{ paddingBottom: '1rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{movie.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Video size={18} /> {movie.genre}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> {movie.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24' }}><Star size={18} fill="#fbbf24" /> {movie.rating} Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container page-wrapper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Synopsis</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>{movie.description}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Cast</h3>
              <p>{movie.cast}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card" style={{ padding: '2rem', sticky: 'top' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Ready to watch?</h3>
            <p style={{ marginBottom: '1.5rem' }}>Grab your tickets now and enjoy the cinematic experience.</p>
            <Link to={`/book/${movie.id}`} style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%' }}>
                <Ticket size={20} /> Book Tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .detail-poster { display: none; }
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
