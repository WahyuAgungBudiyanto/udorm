import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const GensetCoordinate = ({userLocation, onInsideChange}) => {
  const polygonCoords = [
    {latitude: 1.4180003560032515, longitude: 124.98189596421496},
    {latitude: 1.4179239364477296, longitude: 124.98183762616121},
    {latitude: 1.4178642755666535, longitude: 124.98191272801644},
    {latitude: 1.4179145515875522, longitude: 124.981951620055},
    {latitude: 1.417964157264839, longitude: 124.98188925868835},
    {latitude: 1.4179923118392932, longitude: 124.98190870470971},
    {latitude: 1.4179996856562775, longitude: 124.98189730532005},
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
      key={'GensetCoordinate'}
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

export default GensetCoordinate;
