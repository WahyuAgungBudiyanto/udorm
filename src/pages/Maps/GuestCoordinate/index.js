import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const GuestCoordinate = ({userLocation, onInsideChange}) => {
  const polygonCoords = [
    {latitude: 1.4171418643206037, longitude: 124.98183774823806},
    {latitude: 1.4170661150821195, longitude: 124.98177337521841},
    {latitude: 1.4169126055580044, longitude: 124.98195442433872},
    {latitude: 1.4169883547948745, longitude: 124.98201812681886},
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
      const inside = isPointInPolygon(userLocation, polygonCoords);
      onInsideChange(inside);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [userLocation, onInsideChange]);
  return (
    <Polygon
      key={'GuestCoordinate'}
      coordinates={polygonCoords}
      fillColor={
        isPointInPolygon(userLocation, polygonCoords)
          ? 'rgb(102, 255, 102)'
          : 'rgba(255,0,0,0.5)'
      }
      //strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default GuestCoordinate;
