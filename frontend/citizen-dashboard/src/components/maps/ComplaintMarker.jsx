import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import ComplaintPopup from './ComplaintPopup';

const getColoredIcon = (color) => {
  if (!color || color === 'blue') return new L.Icon.Default();
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const ComplaintMarker = ({ position, data, color, onViewDetails }) => {
  return (
    <Marker position={position} icon={getColoredIcon(color)}>
      <ComplaintPopup {...data} onViewDetails={onViewDetails} />
    </Marker>
  );
};

export default ComplaintMarker;
