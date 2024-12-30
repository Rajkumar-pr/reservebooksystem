import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();
  const [avalablseats,setAvailableseats]=useState(80);
  const [reserve,setReserve]=useState(0);
  const [boxes, setBoxes] = useState(() => {
    const initialBoxes = Array.from({ length: 7 }, () =>
      Array.from({ length: 11 }, () => ({ book: false }))
    );
    initialBoxes.push(Array.from({ length: 3 }, () => ({ book: false }))); // Add 8th row
    return initialBoxes;
  });

  const [da, setDa] = useState('');
  
  const data = location?.state;

  const handleClick = async () => {
    if (!da || isNaN(da) || da <= 0) {
      alert('Please enter a valid number of seats.');
      return;
    }

 

    try {
      const response = await fetch('https://backend-server-8690.onrender.com/api/seats/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: data?.id, numberOfSeats: parseInt(da, 10) }),
      });

      if (response.ok) {
        const result = await response.json();
        setAvailableseats(result.numberofseatsreserved);
        setReserve(80-result.numberofseatsreserved)
        setBoxes(result.arr); // Use the updated grid returned by the backend
        console.log(result);
        
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Unable to reserve seats'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    } 
  };

  return (
    <div className="main-container">
    <div className="grid-container-wrapper">
      <div className="grid-container">
        {boxes.map((row, rowIndex) =>
          row.map((seat, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`seat ${seat.book ? 'reserved' : 'available'}`}
            ></div>
          ))
        )}
      </div>

      {/* Booked and Available Seats Info */}
      <div className="seats-info">
        <div className="info-box">Booked Seats: {reserve}</div>
        <div className="info-box">Available Seats: {avalablseats}</div>
      </div>
    </div>

    {/* Controls Section */}
    <div className="controls">
     
    <div className="input-container">
<div>Book Seat</div>
  <div className="input-group">
    <input
      className="number"
      type="number"
      min="1"
      onChange={(e) => setDa(e.target.value)}
      value={da}
      placeholder="Enter seats"
    />
    <button className="buttonf" onClick={handleClick}>
      Book
    </button>
  </div>
 
</div>
    </div>
  </div>
  
  );
}

export default Home;
