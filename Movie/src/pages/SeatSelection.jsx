import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Armchair } from 'lucide-react';
import { movies } from '../data/movies';

const DATES = ['Today, 18 Apr', 'Tomorrow, 19 Apr', 'Wed, 20 Apr', 'Thu, 21 Apr'];
const TIMES = ['10:30 AM', '01:15 PM', '04:00 PM', '07:30 PM', '10:15 PM'];
const ROWS = 6;
const COLS = 8;
const PRICE_PER_TICKET = 15;

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);

  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[3]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) return <div className="container">Movie not found</div>;

  // Generate a mock seat map (some booked randomly for visual effect)
  const [bookedSeats] = useState(() => {
    const booked = new Set();
    for(let i = 0; i < 10; i++) {
      booked.add(`${String.fromCharCode(65 + Math.floor(Math.random() * ROWS))}${Math.floor(Math.random() * COLS) + 1}`);
    }
    return booked;
  });

  const toggleSeat = (seatId) => {
    if (bookedSeats.has(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert("You can only select up to 8 seats at once.");
      }
    }
  };

  const handleContinue = () => {
    navigate('/summary', {
      state: {
        movie,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        total: selectedSeats.length * PRICE_PER_TICKET
      }
    });
  };

  return (
    <div className="container page-wrapper">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{movie.title}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Select Date, Time, and Seats</p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Calendar size={20}/> Select Date</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }} className="scroll-hide">
            {DATES.map(date => (
              <button 
                key={date}
                className={`choice-btn ${selectedDate === date ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>

          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 1rem' }}><Clock size={20}/> Select Time</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {TIMES.map(time => (
              <button 
                key={time}
                className={`choice-btn ${selectedTime === time ? 'active' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Screen This Way</h3>
          
          <div style={{ width: '80%', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto 3rem', borderRadius: '4px', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', overflowX: 'auto' }}>
            {Array.from({ length: ROWS }).map((_, rIndex) => {
              const rowLabel = String.fromCharCode(65 + rIndex);
              return (
                <div key={rIndex} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ width: '20px', fontWeight: 'bold', color: 'var(--text-muted)' }}>{rowLabel}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Array.from({ length: COLS }).map((_, cIndex) => {
                      const seatId = `${rowLabel}${cIndex + 1}`;
                      const isBooked = bookedSeats.has(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      
                      let seatClass = 'seat-available';
                      if (isBooked) seatClass = 'seat-booked';
                      else if (isSelected) seatClass = 'seat-selected';

                      return (
                        <button
                          key={seatId}
                          className={`seat-btn ${seatClass}`}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isBooked}
                          title={seatId}
                        >
                        </button>
                      );
                    })}
                  </div>
                  {/* Space for aisle */}
                  <div style={{ width: '20px' }}></div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Array.from({ length: COLS }).map((_, cIndex) => {
                      const seatId = `${rowLabel}${cIndex + COLS + 1}`;
                      const isBooked = bookedSeats.has(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      
                      let seatClass = 'seat-available';
                      if (isBooked) seatClass = 'seat-booked';
                      else if (isSelected) seatClass = 'seat-selected';

                      return (
                        <button
                          key={seatId}
                          className={`seat-btn ${seatClass}`}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isBooked}
                          title={seatId}
                        >
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div className="seat-btn seat-available" style={{cursor:'default'}}></div> Available</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div className="seat-btn seat-selected" style={{cursor:'default'}}></div> Selected</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div className="seat-btn seat-booked" style={{cursor:'default'}}></div> Booked</div>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: '20px', zIndex: 10, animation: 'fadeIn 0.3s ease-out', border: '1px solid var(--accent-color)' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{selectedSeats.length} Ticket(s)</p>
              <h3 style={{ fontSize: '1.5rem' }}>${selectedSeats.length * PRICE_PER_TICKET}</h3>
            </div>
            <button className="btn-primary" onClick={handleContinue}>Continue to Summary</button>
          </div>
        )}
      </div>

      <style>{`
        .choice-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-main);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition);
          white-space: nowrap;
        }
        .choice-btn:hover { background: rgba(255,255,255,0.1); }
        .choice-btn.active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        }
        .seat-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px 8px 4px 4px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .seat-btn:hover:not(:disabled) { transform: scale(1.1); }
        .seat-available { background: var(--seat-available); }
        .seat-selected { background: var(--seat-selected); box-shadow: 0 0 10px rgba(99,102,241,0.5); }
        .seat-booked { background: var(--seat-booked); cursor: not-allowed; opacity: 0.5; }
        
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
