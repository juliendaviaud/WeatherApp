import React from "react";
import "./PrecipitationMap.css";
import { fetchOpenStreetMap, fetchPrecipitationMap } from "../api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PrecipitationMap = ({ coord }) => {
  if (!coord) return null;

  // Correcting the marker icon
  /* delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const mapUrl = fetchPrecipitationMap(
    Math.round(coord.lat),
    Math.round(coord.lon),
    6
  ); */
  /*console.log(coord);
	console.log(Math.round(coord.lon)); */

  const position = [coord.lat, coord.lon];

  const openstreetmapMapUrl = fetchOpenStreetMap();

  const precipitationMapUrl = fetchPrecipitationMap(
    Math.round(coord.lat),
    Math.round(coord.lon),
    10
  );

  return (
    <div className="weatherMap">
      <p className="mapTitle">Précipitations</p>
      <MapContainer
        id="map"
        center={position}
        zoom={3}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer url={openstreetmapMapUrl} />
        <TileLayer url={precipitationMapUrl} />
      </MapContainer>
    </div>
  );
};

export default PrecipitationMap;
