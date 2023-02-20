import {Polygon} from 'react-native-maps';

const GuestCoordinate = () => {
  return (
    <Polygon
      key={GuestCoordinate.id}
      coordinates={[
        {latitude: 1.4171418643206037, longitude: 124.98183774823806},
        {latitude: 1.4170661150821195, longitude: 124.98177337521841},
        {latitude: 1.4169126055580044, longitude: 124.98195442433872},
        {latitude: 1.4169883547948745, longitude: 124.98201812681886},
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default GuestCoordinate;
