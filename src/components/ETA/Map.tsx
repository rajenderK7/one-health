import React from "react";
import coordinates from "../ETA/coordinates";
import { MapContainer, TileLayer, Polyline, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

const center = [40.63463151377654, -97.89969605983609];

export default function Map(props: { location: any }) {
  const location = props.location;
  const [geoJsonData, setGeoJsonData] = useState([
    [location[0][0], location[0][1]],
    [location[1][0], location[1][1]],
  ]);

  const reqOptions: HeadersInit = {
    "access-control-allow-origin": "*",
    "content-length": "1037",
    "content-type": "application/geo+json;charset=UTF-8",
    "x-ratelimit-limit": "2000",
    "x-ratelimit-remaining": "1832",
    "x-ratelimit-reset": "1667586506",
  };
  let cor: any[] = [];
  const getMapCord = async (location: any[][]) => {
    coordinates.map((points: any[]) => {
      cor = [...cor, [points[1], points[0]]];
      // console.log(cor)
    });
    
    cor.pop()
    setGeoJsonData(cor);
  };

  useEffect(() => {
    getMapCord(location);
  }, []);

  return (
    <div>
      {geoJsonData && (
        <MapContainer
          center={[geoJsonData[0][0], geoJsonData[0][1]]}
          zoom={20}
          style={{ width: "100vw", height: "100vh" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=NXyhRIGqdVy13tsmlE20"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Polyline positions={geoJsonData} />
        </MapContainer>
      )}
    </div>
  );
}
