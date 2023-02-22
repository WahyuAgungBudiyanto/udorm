import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const ChapelCoordinate = ({userLocation}) => {
  const polygonCoords = [
    {latitude: 1.418965836164829, longitude: 124.98401602247135},
    {latitude: 1.4189398880484425, longitude: 124.98371470660337},
    {latitude: 1.4184637971423986, longitude: 124.98374856230883},
    {latitude: 1.4184886169063333, longitude: 124.98405439229917},
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
      key={'ChapelCoordinate'}
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

export default ChapelCoordinate;
