import {StyleSheet, View, PermissionsAndroid, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CrystalCoordinate from '../CrystalCoordinate';
import EdelCoordinate from '../EdelCoordinate';
import GensetCoordinate from '../GensetCoordinate';
import GuestCoordinate from '../GuestCoordinate';
import JasmineCoordinate from '../JasmineCoordinate';
import AnnexCoordinate from '../AnnexCoordinate';
import ChapelCoordinate from '../ChapelCoordinate';
import {getAuth} from 'firebase/auth';
import {ref as r, getDatabase, child, get, update} from 'firebase/database';
const db = getDatabase();

const MainLoc = ({}) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const uid = authentication.currentUser.uid; 

  const updateUserLocation = (location) => {
    update(r(db, `Student/${uid}/Location`), {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        updateUserLocation(location);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };



  useEffect(() => {
    if (uid) {
      const locationUpdateInterval = setInterval(() => {
        getCurrentLocation();
      }, 2000);

      return () => clearInterval(locationUpdateInterval);
    }
  }, [uid]);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          watchId = setInterval(() => {
            Geolocation.getCurrentPosition(
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
          }, 2000);
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();
    return () => clearInterval(watchId);
  }, []);

  const onMapReady = () => {
    setMapReady(true);
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
        showsMyLocationButton={true}>
        {mapReady && (
          <>
            <CrystalCoordinate userLocation={initialRegion} />
            <EdelCoordinate userLocation={initialRegion} />
            <GensetCoordinate userLocation={initialRegion} />
            <GuestCoordinate userLocation={initialRegion} />
            <JasmineCoordinate userLocation={initialRegion} />
            <AnnexCoordinate userLocation={initialRegion} />
            <ChapelCoordinate userLocation={initialRegion} />
          </>
        )}
      </MapView>
      <Text></Text>
    </View>
  );
};

export default MainLoc;

const styles = StyleSheet.create({});
