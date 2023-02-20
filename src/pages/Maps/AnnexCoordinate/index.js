import {Polygon} from 'react-native-maps';

const AnnexCoordinate = () => {
  return (
    <Polygon
      key={AnnexCoordinate.id}
      coordinates={[
        {latitude: 1.4181863819860405, longitude: 124.98330082734202},
        {latitude: 1.4181783378042592, longitude: 124.98318549229985},
        {latitude: 1.4180590160168793, longitude: 124.98319353891223},
        {latitude: 1.4180509718517051, longitude: 124.98309966158453},
        {latitude: 1.417914221074104, longitude: 124.98311307262709},
        {latitude: 1.4179182431553277, longitude: 124.98313453030013},
        {latitude: 1.417869978175473, longitude: 124.9831412358221},
        {latitude: 1.4178619340120433, longitude: 124.98302858304423},
        {latitude: 1.417770766820183, longitude: 124.98302858304369},
        {latitude: 1.4177935585871417, longitude: 124.98333301380129},
        {latitude: 1.4177935585871417, longitude: 124.98333301380129},
      ]}
      fillColor="rgb(102, 255, 102)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={1}
    />
  );
};

export default AnnexCoordinate;
