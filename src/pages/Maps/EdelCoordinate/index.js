import {Polygon} from 'react-native-maps';

const EdelCoordinate = () => {
  return (
    <Polygon
      key={EdelCoordinate.id}
      coordinates={[
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
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default EdelCoordinate;
