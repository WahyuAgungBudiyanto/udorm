import {Polygon} from 'react-native-maps';
import React, {useEffect} from 'react';

const CrystalCoordinate = ({userLocation}) => {
  const polygonCoords = [
    {latitude: 1.4170968843899396, longitude: 124.9833921186385},
    {latitude: 1.4170888402025656, longitude: 124.9832667253487},
    {latitude: 1.416963497405622, longitude: 124.98327644477946},
    {latitude: 1.4169500904601202, longitude: 124.98314367542422},
    {latitude: 1.4168750115691517, longitude: 124.9831503809505},
    {latitude: 1.4167824263671467, longitude: 124.98315865240355},
    {latitude: 1.416778407272683, longitude: 124.98308226630655},
    {latitude: 1.4166457772380567, longitude: 124.98308896683724},
    {latitude: 1.4166538154230743, longitude: 124.98317473368786},
    {latitude: 1.4164876929398247, longitude: 124.98319081497294},
    {latitude: 1.4164943914160024, longitude: 124.98331812514265},
    {latitude: 1.416375158312233, longitude: 124.98332884600896},
    {latitude: 1.4163805170644117, longitude: 124.98344543536253},
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
      key={'CrystalCoordinate'}
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

export default CrystalCoordinate;
