import {Polygon} from 'react-native-maps';

const JasmineCoordinate = () => {
  return (
    <Polygon
      key={JasmineCoordinate.id}
      coordinates={[
        {latitude: 1.4177234129429015, longitude: 124.98200303570027},
        {latitude: 1.4180199151759438, longitude: 124.9822297094763},
        {latitude: 1.417876737276617, longitude: 124.98245638333444},
        {latitude: 1.417559942107284, longitude: 124.98222294306275},
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default JasmineCoordinate;
