import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Alert } from 'flowbite-react';
import { useSelector } from 'react-redux';

const DashMap = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [reviewLocations, setReviewLocations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviewLocations = async () => {
          try {
            const res = await fetch('/api/review/getReviewLocations');
            const data = await res.json();
            if (res.ok) {
              setReviewLocations(data);
              console.log(data);
            } else {
              setError(data.message);
            }
          } catch (error) {
            setError('Failed to fetch review locations');
          }
        };
        if (currentUser.isAdmin) {
            fetchReviewLocations();
          }
      }, [currentUser._id]);

      if (error) {
        return <Alert color='failure'>{error}</Alert>;
      }

  return (
        <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '400px', width: '100%'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {reviewLocations.map((review, index) => (
            <Marker
              key={index}
              position={[review.location.coordinates[1], review.location.coordinates[0]]}
            >
              <Popup>
                Review Location: {review.location.coordinates[1]}, {review.location.coordinates[0]}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
  )
}

export default DashMap