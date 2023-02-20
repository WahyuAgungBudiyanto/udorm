import {Polygon} from 'react-native-maps';

const ChapelCoordinate = () => {
  return (
    <Polygon
      key={ChapelCoordinate.id}
      coordinates={[
        {latitude: 1.418965836164829, longitude: 124.98401602247135},
        {latitude: 1.4189398880484425, longitude: 124.98371470660337},
        {latitude: 1.4184637971423986, longitude: 124.98374856230883},
        {latitude: 1.4184886169063333, longitude: 124.98405439229917},
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default ChapelCoordinate;
