import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Ticket, Film } from 'lucide-react';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import BookingSummary from './pages/BookingSummary';
import Payment from './pages/Payment';

import './index.css';

function App() {
  return (
    <Router>
      <header className="navbar">
        <div className="container">
          <Link to="/" className="nav-brand">
            <Film className="logo-icon" size={32} />
            <span>CineBook</span>
          </Link>
          <div style={{display: 'flex', gap: '1rem'}}>
            <Link to="/"  style={{color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500'}}>Movies</Link>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/summary" element={<BookingSummary />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>

      <footer style={{ marginTop: 'auto', padding: '2rem 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
        <p>&copy; 2026 CineBook Inc. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
