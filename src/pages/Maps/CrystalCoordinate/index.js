import {Polygon} from 'react-native-maps';

const CrystalCoordinate = () => {
  return (
    <Polygon
      key={CrystalCoordinate.id}
      coordinates={[
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
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default CrystalCoordinate;
