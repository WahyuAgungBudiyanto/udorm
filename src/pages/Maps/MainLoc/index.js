import {StyleSheet, View, PermissionsAndroid, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CrystalCoordinate from '../CrystalCoordinate';
import EdelCoordinate from '../EdelCoordinate';
import GensetCoordinate from '../GensetCoordinate';
import GuestCoordinate from '../GuestCoordinate';
import JasmineCoordinate from '../JasmineCoordinate';
import AnnexCoordinate from '../AnnexCoordinate';
import ChapelCoordinate from '../ChapelCoordinate';
import {ref as r, onValue, off, getDatabase, child, get, update} from 'firebase/database';
import authentication, {db} from '../../../config/firebase-config';

const MainLoc = ({navigation}) => {

  
  const handleButtonPress = () => {
    // Add your logic here
  if (userType === 'Monitor') {
    navigation.navigate('HomeMonitor');
  } else if (userType === 'Student') {
    navigation.navigate('HomeStudent');
  }
    console.log('Button pressed');
  };  
  const [initialRegion, setInitialRegion] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const uid = authentication.currentUser.uid;
  const [inside, setInside] = useState(false);
  const [studentType, setStudentType] = useState(null);
  const [userType, setUserType] = useState(null);
  const [studentLocations, setStudentLocations] = useState([]);

  const checkUserType = async uid => {
    const db = getDatabase();

    // Check if the user exists in the Monitor section
    const monitorRef = r(db, `Monitor/${uid}`);
    const monitorSnapshot = await get(monitorRef);
    if (monitorSnapshot.exists()) {
      return 'Monitor';
    }

    // Check if the user exists in the Student section
    const studentRef = r(db, `Student/${uid}`);
    const studentSnapshot = await get(studentRef);
    if (studentSnapshot.exists()) {
      return 'Student';
    }

    return null;
  };


  const fetchStudentType = () => {
    const studentTypeRef = r(db, `Student/${uid}/StudentType`);
    onValue(
      studentTypeRef,
      snapshot => {
        if (snapshot.exists()) {
          setStudentType(snapshot.val());
        } else {
          //console.log('No data available');
        }
      },
      error => {
        console.error(error);
      },
    );
  };

  const updateUserLocation = (location, inside) => {
    update(r(db, `Student/${uid}/Location`), {
      latitude: location.latitude,
      longitude: location.longitude,
      inside: inside,
    });
  };

  const getCurrentLocation = inside => {
    if (userType === 'Monitor') {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        updateUserLocation(location, inside);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    if (uid) {
      (async () => {
        const type = await checkUserType(uid);
        setUserType(type);
      })();

      fetchStudentType();

      if (userType !== 'Monitor') {
        const locationUpdateInterval = setInterval(() => {
          getCurrentLocation(inside);
        }, 1000);

        return () => {
          clearInterval(locationUpdateInterval);
          // Remove the listener
          const studentTypeRef = r(db, `Student/${uid}/StudentType`);
          off(studentTypeRef);
        };
      } else {
        // Fetch student locations when the user is a Monitor
        const fetchStudentLocations = () => {
          const studentsRef = r(db, 'Student');
          onValue(studentsRef, snapshot => {
            if (snapshot.exists()) {
              const studentsData = snapshot.val();
              const locations = Object.keys(studentsData).map(key => {
                const student = studentsData[key];
                return {
                  uid: key,
                  latitude: student.Location.latitude,
                  longitude: student.Location.longitude,
                };
              });
              setStudentLocations(locations);
            } else {
              console.log('No data available');
            }
          });
        };

        fetchStudentLocations();

        // Remove the listener
        const studentTypeRef = r(db, `Student/${uid}/StudentType`);
        off(studentTypeRef);
      }
    }
  }, [uid, inside, userType]);

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
            {studentType === 'Crystal' || userType === 'Monitor' ? <CrystalCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {studentType === 'Edel' || userType === 'Monitor' ? <EdelCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {studentType === 'Genset' || userType === 'Monitor' ? <GensetCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {studentType === 'Guest' || userType === 'Monitor' ? <GuestCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {studentType === 'Jasmine' || userType === 'Monitor' ? <JasmineCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {studentType === 'Annex' || userType === 'Monitor' ? <AnnexCoordinate userLocation={initialRegion} onInsideChange={setInside}/> : null}
            {(['Crystal', 'Edel', 'Genset', 'Guest', 'Jasmine', 'Annex'].includes(studentType) || userType === 'Monitor') && (
                <ChapelCoordinate userLocation={initialRegion} onInsideChange={setInside}/>
            )}
            {userType === 'Monitor' &&
              studentLocations.map((location, index) => (
                
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={`Student ${index + 1}`}
                />
              ))}
          </>
        )}
      </MapView>
      <Pressable
        style={({pressed}) => [
          styles.floatingButton,
          pressed ? styles.buttonPressed : styles.buttonNotPressed,
          {opacity: pressed ? 0.5 : 1},
        ]}
        onPress={handleButtonPress}>
        <Text style={styles.buttonText}>ABSENT NOW</Text>
      </Pressable>
    </View>
  );
};




export default MainLoc;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonPressed: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // transparent blue
  },
  buttonNotPressed: {
    backgroundColor: 'rgba(123, 201, 222, 1)', // transparent blue
  },
});
