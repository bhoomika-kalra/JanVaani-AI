import React from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';

const pickerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationPicker = ({ position, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect([e.latlng.lat, e.latlng.lng]);
      }
    }
  });

  if (!position) return null;

  return (
    <Marker position={position} icon={pickerIcon} />
  );
};

export default LocationPicker;
