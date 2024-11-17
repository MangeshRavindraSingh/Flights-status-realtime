import { useState, useEffect } from 'react';
import './FlightList.css';
import { Link } from 'react-router-dom';

const TIME_INTERVAL = 30000;
const STATUS_COLOR_CODE: Record<string, string> = {
  "On Time": "text-success",
  "Departed": "text-danger",
  "Delayed": "text-warning",
  "Boarding": "text-info"
};

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: keyof typeof STATUS_COLOR_CODE;
}

function FlightList() {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const interval = setTimeout(() => {
    setRefresh(!refresh);
  }, TIME_INTERVAL);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch('https://flight-status-mock.core.travelopia.cloud/flights');
        if (!response.ok) {
          throw new Error('Failed to fetch flight data');
        }
        const data: Flight[] = await response.json();
        setFlightData(data);
        setError(null); // Clear error on successful fetch
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };

    fetchFlightData();

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return (
    <div className="flight-list-container">
      <h1 className="display-4 text-white text-center">Flight List</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Flight Number</th>
            <th scope="col">Airline</th>
            <th scope="col">Origin</th>
            <th scope="col">Destination</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {flightData.length === 0 ? (
            <tr>
              <td colSpan={6}>No flights available at the moment.</td>
            </tr>
          ) : (
            flightData.map((flight) => (
              <tr key={flight.id}>
                <td>
                  <Link className="text-dark fw-bold" to={`/details/${flight.id}`}>
                    {flight.flightNumber}
                  </Link>
                </td>
                <td>
                  <Link className="text-dark" to={`/details/${flight.id}`}>
                    {flight.airline}
                  </Link>
                </td>
                <td>
                  <Link className="text-dark" to={`/details/${flight.id}`}>
                    {flight.origin}
                  </Link>
                </td>
                <td>
                  <Link className="text-dark" to={`/details/${flight.id}`}>
                    {flight.destination}
                  </Link>
                </td>
                <td>
                  <Link className="text-dark" to={`/details/${flight.id}`}>
                    {flight.departureTime}
                  </Link>
                </td>
                <td>
                  <Link className={`${STATUS_COLOR_CODE[flight.status]} fw-bold`} to={`/details/${flight.id}`}>
                    {flight.status}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;
