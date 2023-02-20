import {Polygon} from 'react-native-maps';

const GensetCoordinate = () => {
  return (
    <Polygon
      key={GensetCoordinate.id}
      coordinates={[
        {latitude: 1.4180003560032515, longitude: 124.98189596421496},
        {latitude: 1.4179239364477296, longitude: 124.98183762616121},
        {latitude: 1.4178642755666535, longitude: 124.98191272801644},
        {latitude: 1.4179145515875522, longitude: 124.981951620055},
        {latitude: 1.417964157264839, longitude: 124.98188925868835},
        {latitude: 1.4179923118392932, longitude: 124.98190870470971},
        {latitude: 1.4179996856562775, longitude: 124.98189730532005},
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default GensetCoordinate;
