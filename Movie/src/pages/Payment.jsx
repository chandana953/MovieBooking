import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  if (!location.state) return <Navigate to="/" />;
  
  const { movie, finalTotal } = location.state;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', animation: 'fadeIn 0.5s ease-out' }}>
          <CheckCircle size={80} color="var(--success-color)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your booking for <strong>{movie.title}</strong> has been confirmed. We've sent your tickets to your email.
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Checkout</h2>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Dummy Credit Card Visual */}
        <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--accent-color)', opacity: '0.2', borderRadius: '50%', filter: 'blur(30px)' }}></div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>CineBook Card</span>
            <ShieldCheck size={24} color="var(--accent-color)" />
          </h3>
          <p style={{ letterSpacing: '2px', fontSize: '1.1rem', marginBottom: '1rem', color: '#e2e8f0' }}>**** **** **** 4242</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <span>JOHN DOE</span>
            <span>12/28</span>
          </div>
        </div>

        <form onSubmit={handlePayment}>
          <div className="input-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Doe" required defaultValue="John Doe" />
          </div>
          <div className="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" required defaultValue="4242 4242 4242 4242" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required defaultValue="12/28" />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="password" placeholder="123" required defaultValue="123" />
            </div>
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
