import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const EdelCoordinate = ({userLocation, onInsideChange}) => {
  const polygonCoords = [
    {latitude: 1.417083571545593, longitude: 124.98482484966706},
    {latitude: 1.4170688238882165, longitude: 124.98460222625258},
    {latitude: 1.4167980609512913, longitude: 124.98462120453124},
    {latitude: 1.4167942688944846, longitude: 124.98458896219239},
    {latitude: 1.41668903931741, longitude: 124.98459844523404},
    {latitude: 1.4166899873313166, longitude: 124.9846297392677},
    {latitude: 1.4164264393605648, longitude: 124.98464775704527},
    {latitude: 1.4164378155179487, longitude: 124.98487535007465},
    {latitude: 1.4165193447665276, longitude: 124.98486966025786},
    {latitude: 1.4167002897764664, longitude: 124.98485385463655},
    {latitude: 1.4167032595402682, longitude: 124.98491802375871},
    {latitude: 1.4168283974214002, longitude: 124.98491138563848},
    {latitude: 1.4168227303592669, longitude: 124.98484659125981},
    {latitude: 1.4170049205775883, longitude: 124.9848312038472},
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
      key={'EdelCoordinate'}
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

export default EdelCoordinate;