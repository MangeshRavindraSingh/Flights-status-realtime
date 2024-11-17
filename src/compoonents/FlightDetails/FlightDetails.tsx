import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

function FlightDetails() {
  const { id } = useParams<{ id: string }>();
  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    const fetchFlightData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      setFlightData(null); // Reset flight data
      try {
        const response = await fetch(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
        if (!response.ok) {
          throw new Error(`Flight with ID ${id} not found`);
        }
        const data: Flight = await response.json();
        setFlightData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlightData();
    }
  }, [id, refresh]);

  const handleRefresh = () => {
    setFlightData(null); // Clear flight data before refreshing
    setError(null); // Clear error message
    setRefresh(!refresh)
  };

  return (
    <>
      <h1 className="display-4 text-white text-center">Flight Details</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
      <div className="card">
        <Loader loading={loading} />
        {flightData && !loading && (
          <div className="card-body p-5">
            <h5 className="card-title mb-5">
              Flight Number: {flightData.flightNumber} | Airline: {flightData.airline}
            </h5>
            <div className="row">
              <div className="col">
                <p className="card-text">Origin: {flightData.origin}</p>
                <p className="card-text">Destination: {flightData.destination}</p>
              </div>
              <div className="col">
                <p className="card-text">Departure Time: {flightData.departureTime}</p>
                <p className="card-text">Status: {flightData.status}</p>
              </div>
            </div>
            <button onClick={handleRefresh} className="btn btn-primary mt-5">
              Refresh
            </button>
          </div>
        )}
        {flightData === null && !loading && !error && (
          <div className="alert alert-info">Flight details are unavailable at the moment.</div>
        )}
      </div>
    </>
  );
}

export default FlightDetails;
