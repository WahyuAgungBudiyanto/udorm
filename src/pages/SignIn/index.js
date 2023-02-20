import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const SignIn = ({navigation}) => {
  const btnSignUp = () => {
    navigation.push('SignUp');
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'U-DORM Absences Permission',
          message:
            'U-DORM membutuhkan akses ke lokasi-mu ' +
            'agar monitor bisa melakukan pengecekan absen.',
          buttonNegative: 'NO',
          buttonPositive: 'YES',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        watchId = Geolocation.watchPosition(
          position => {
            setInitialRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const [initialRegion, setInitialRegion] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  useEffect(() => {
    requestLocationPermission();
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const onMapReady = () => {
    if (initialRegion) {
      mapRef.animateToRegion(initialRegion, 2000);
    }
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height: 300, flex: 1}}
        initialRegion={initialRegion}
        showsUserLocation={true}
        ref={ref => {
          setMapRef(ref);
        }}
        onMapReady={onMapReady}
        showsMyLocationButton={false}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  btnSign: {},
});

{
  /* <View
        style={{
          marginTop: 20,
          justifyContent: 'flex-end',
          alignItems: 'center',
         }}>
        <Button title="Sign Up" onPress={() => btnSignUp()} />
       </View> */
}
