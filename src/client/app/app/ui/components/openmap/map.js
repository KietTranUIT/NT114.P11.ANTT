"use client";
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const OpenStreetMap = () => {
  const [center, setCenter] = useState({
    lat: 10.87603901434146,
    lng: 106.80937826692964,
  });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const routeCoordinates = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.52, -0.12],
  ];

  return (
    <>
      <div className="container">
        <MapContainer
          // center={center}
          center={[51.505, -0.09]} 
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          style={{ width: "100%", height: "500px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {location.loaded && !location.error && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
              
            ></Marker>
          )} */}
          <Polyline
            positions={routeCoordinates}
            color="blue"
            weight={5}
            opacity={0.7}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default OpenStreetMap;
