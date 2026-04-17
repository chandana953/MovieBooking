import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CreditCard, Calendar, Clock, Ticket } from 'lucide-react';

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state) return <Navigate to="/" />;

  const { movie, date, time, seats, total } = location.state;

  return (
    <div className="container page-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Booking Summary</h2>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <img 
            src={movie.image} 
            alt={movie.title} 
            style={{ width: '100px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{movie.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{movie.genre}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar className="text-gradient" />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Date</p>
              <p style={{ fontWeight: '500' }}>{date}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock className="text-gradient" />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Time</p>
              <p style={{ fontWeight: '500' }}>{time}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', gridColumn: 'span 2' }}>
            <Ticket className="text-gradient" />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Seats ({seats.length})</p>
              <p style={{ fontWeight: '500' }}>{seats.join(', ')}</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ticket Price</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Convenience Fee</span>
            <span>$3.50</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total Payable</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>${(total + 3.5).toFixed(2)}</span>
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%' }}
          onClick={() => navigate('/payment', { state: { ...location.state, finalTotal: total + 3.5 } })}
        >
          <CreditCard size={20} /> Proceed to Payment
        </button>
      </div>
    </div>
  );
}
