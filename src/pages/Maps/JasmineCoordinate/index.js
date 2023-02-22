import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const JasmineCoordinate = ({userLocation}) => {
  const polygonCoords = [
    {latitude: 1.4177234129429015, longitude: 124.98200303570027},
    {latitude: 1.4180199151759438, longitude: 124.9822297094763},
    {latitude: 1.417876737276617, longitude: 124.98245638333444},
    {latitude: 1.417559942107284, longitude: 124.98222294306275},
  ];

  function isPointInPolygon(userLocation, polygonCoords) {
    if (!userLocation) {
      return false;
    }

    const x = userLocation.longitude;
    const y = userLocation.latitude;
    let inside = false;

    for (
      let i = 0, j = polygonCoords.length - 1;
      i < polygonCoords.length;
      j = i++
    ) {
      const xi = polygonCoords[i].longitude;
      const yi = polygonCoords[i].latitude;
      const xj = polygonCoords[j].longitude;
      const yj = polygonCoords[j].latitude;

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    //console.log(inside ? 'Inside' : 'Outside', userLocation);

    return inside;
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      isPointInPolygon(userLocation, polygonCoords);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [userLocation]);
  return (
    <Polygon
      key={'JasmineCoordinate'}
      coordinates={polygonCoords}
      fillColor={
        isPointInPolygon(userLocation, polygonCoords)
          ? 'rgba(102, 255, 102, 0.5)'
          : 'rgba(255,0,0,0.5)'
      }
      //strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default JasmineCoordinate;
