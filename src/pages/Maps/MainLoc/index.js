import {StyleSheet, View, PermissionsAndroid, Text, Pressable, Alert, ActivityIndicator, Image, Linking  } from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {ZoomIn, ZoomOut} from '../../../assets/images';
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
  const [absentType, setAbsentType] = useState(null);
  const [studentToken, setStudentToken] = useState([]);
  const [userType, setUserType] = useState(null);
  const [studentLocations, setStudentLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [monitorCoordinate, setMonitorCoordinate] = useState(null);
  const [sheetDBAPI, setSheetDBAPI] = useState('');
  const [absenNow, setAbsenNow] = useState(false)


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


  const fetchTokenpn = () => {
    const studentTypeRef = r(db, `Student`);
    onValue(
      studentTypeRef,
      snapshot => {
        console.log("snapshot tokenpn:",snapshot.val());
        let tempArray =[]
        for (const key in snapshot.val()) {
            tempArray.push(snapshot.val()[key].tokenpn)
          // console.log(`${snapshot.val()[key].tokenpn}`);
        }
        setStudentToken(tempArray);
      },
      error => {
        console.error(error);
      },
    );
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

  const fetchAbsentType = () => {
    const MonitorTypeRef = r(db, `Monitor/80cKQ088SPQhmJJKCr2ANsPe5dv2/absentType`);
    onValue(
      MonitorTypeRef,
      snapshot => {
        if (snapshot.exists()) {
          setAbsentType(snapshot.val());
        } else {
          //console.log('No data available');
        }
      },
      error => {
        console.error(error);
      },
    );
  };

  const fetchSheetDBAPI = async () => {
    try {
      const sheetDBAPIRef = r(
        db,
        `Monitor/80cKQ088SPQhmJJKCr2ANsPe5dv2/sheetDBAPI`,
      );
      onValue(sheetDBAPIRef, snapshot => {
        if (snapshot.exists()) {
          setSheetDBAPI(snapshot.val());
        } else {
          console.log('No SheetDB API endpoint available');
        }
      });
    } catch (error) {
      console.error('There was a problem fetching the API endpoint:', error);
    }
  };

  useEffect(() => {
    fetchAbsentType(); // Call the function to set absentType state
    fetchSheetDBAPI();
    fetchTokenpn();
  }, []);

  // Log the value of absentType when it is updated
  useEffect(() => {
    //console.log(absentType);
  }, [absentType]);


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

  useEffect(() => {
  
    setMonitorCoordinate({
      latitude: 1.4174552420479594, // Your fixed latitude value,
      longitude: 124.98335068219275, // Your fixed longitude value,
    });
 
}, [userType]);

const focusOnMonitor = () => {
  // Return immediately if the user is not a Monitor
 
    if (mapRef && initialRegion) {
      mapRef.animateToRegion(
        {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        2000,
      );
   
  }

  if (mapRef && monitorCoordinate) {
    mapRef.animateToRegion(
      {
        latitude: monitorCoordinate.latitude,
        longitude: monitorCoordinate.longitude,
        latitudeDelta: 0.0036,
        longitudeDelta: 0.0036,
      },
      2000,
    );
  }
};

useEffect(() => {
  focusOnMonitor();
}, [monitorCoordinate, mapRef, userType]);



const onMapReady = () => {
  setMapReady(true);
  if (userType === 'Monitor') {
    setInitialRegion({
      latitude: monitorCoordinate.latitude,
      longitude: monitorCoordinate.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  } else {
    mapRef.animateToRegion(initialRegion, 2000);
  }
  focusOnMonitor();
};





const incrementPointsForAbsentStudents = async studentsInsideStatus => {
  setIsLoading(true); // Set loading state to true

  for (const studentUid in studentsInsideStatus) {
    if (!studentsInsideStatus[studentUid]) {
      const pointsRef = r(db, `Student/${studentUid}/points`);
      const pointsSnapshot = await get(pointsRef);
      const currentPoints = pointsSnapshot.exists()
        ? Number(pointsSnapshot.val()) // Convert the value to a number
        : 0;
      const newPoints = currentPoints + 1;
      await update(r(db, `Student/${studentUid}`), {points: newPoints});
    }
  }

  setIsLoading(false); // Set loading state to false
  Alert.alert('Done', 'Points updated for all absent students');
  resetStudentLocations();
};


const checkAllStudentsInsideStatus = async () => {
  const studentsRef = r(db, 'Student');
  const studentsSnapshot = await get(studentsRef);

  if (studentsSnapshot.exists()) {
    const studentsData = studentsSnapshot.val();
    const insideStatuses = {};

    for (const studentUid in studentsData) {
      const inside = studentsData[studentUid]?.Location?.inside;
      insideStatuses[studentUid] = inside;
    }

    return {insideStatuses, studentsData};
  } else {
    return null;
  }
};

const formatWITDateTime = date => {
  // Add 7 hours to the date (WIT is UTC+7)
  date.setHours(date.getHours() + 7);

  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format date and time as 'dd/MM/yyyy HH:mm:ss'
  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


const sendNotification = () => {
  const headers = {
    'Authorization': 'key=AAAAP9tbbbE:APA91bGH-JCjEKDfM_O4ZyyckelgEccAk-bl2kF7ME4fEBPw_F8ycSriXPfpH-bMEEprDn7kTwyiSfnoFyw5UQDy34ELWZqwn0yvW0Wo-qQ-VWdpZ09NusXdXfRE_aV5HbVX-YZxaXXl',
    'Content-Type': 'application/json'
  };

  const data = {
    // registration_ids: [
    //  'dlnGXIy9Tsy_9Vg_Znr9TV:APA91bEc6asLb2ltgKG5tGBcnM1d1Bv5uUtOWQ6AHqfnupGsNr12FRMLeUcd1x9k6OjmZCKZT94wVEWm565TWAlYXvTYLOXMiLy-mkWY3oUY_ZzPtwTjmyuKDjdvTBoTwxtv5Jn9oRQx',
    //   'dTQM7OzRSLSX4kChWPHaOr:APA91bG1sOcVfCnXbrzpJo2pNWxtUMY0nyaUiKrN0EBtrk3HNmVJjzsy93Fatju7FnVdSxx3dQ6fuzaXVfHgir_JIlT0E2QuKmxKLTDxMcsP1eIJRboZ12mW2J3ErsMLj0J_4B81TVag'
    // ],
    registration_ids: studentToken,
    priority: 'high',
    notification: {
      title: 'siap siap absen',
      body: 'siap buka hp',
      sound: 'default'
    }
  };

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => console.log(response))
    .catch(error => console.error(error));
};


const handleAbsentNowPress = async () => {
  const result = await checkAllStudentsInsideStatus();

  if (!result) {
    console.error('Error fetching student data.');
    return;
  }

  const {insideStatuses: allStudentsInsideStatus, studentsData} = result;
  console.log('Inside statuses for all students:', allStudentsInsideStatus);

  // Filter students with inside = false
  const absentStudents = Object.keys(allStudentsInsideStatus)
    .filter(studentUid => !allStudentsInsideStatus[studentUid])
    .map(studentUid => ({
      uid: studentUid,
      Name: studentsData[studentUid].Name,
      Parent: studentsData[studentUid].Parent,
      Location: studentsData[studentUid].Location,
    }));

  const absentPhoneNumbersAndNames = absentStudents.map(student => {
    return {
      name: student.Name,
      phoneNumber: student.Parent,
      latitude: student.Location.latitude,
      longitude: student.Location.longitude,
    };
  });

  console.log(absentPhoneNumbersAndNames);

  const url = 'http://217.195.197.235:5000/send-message';

  absentPhoneNumbersAndNames.forEach(async studentInfo => {
    const body = {
      wa_numbers: [studentInfo.phoneNumber],
      message: `Hai, orang tua dari ${studentInfo.name}. Anak anda tidak mengikuti absen yang berada di ${absentType}. Point telah ditambahkan. `,
    };

    // Send a POST request with the absent student's phone number
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });

  // Create an array of objects containing the absent student's name, and current datetime
  const absentData = absentStudents.map(student => {
    return {
      DATETIME: formatWITDateTime(new Date()),
      NAME: student.Name,
      ABSENTTYPE: absentType,
    };
  });

  console.log(absentData);


  // Send data to SheetDB using a POST request for each absent student
  for (const data of absentData) {
    try {
      const response = await fetch(sheetDBAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  

  await incrementPointsForAbsentStudents(allStudentsInsideStatus);
};

const handleNotifyStudent  = async () =>{
  sendNotification()
  setAbsenNow(true)
}



const resetStudentLocations = async () => {
  const db = getDatabase();
  const userType = await checkUserType(uid);

  if (userType === 'Monitor') {
    const studentRef = r(db, 'Student'); // Define the studentRef variable here
    const snapshot = await get(studentRef); // Use the 'get' method to fetch data once
    snapshot.forEach(childSnapshot => {
      const studentUID = childSnapshot.key;
      update(r(db, `Student/${studentUID}/Location`), {
        latitude: 0,
        longitude: 0,
        inside: false,
      });
    });
  } else {
    console.log('User is not a Monitor');
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
            {absentType === 'dorm' &&
              (studentType === 'Crystal' || userType === 'Monitor') && (
                <CrystalCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {absentType === 'dorm' &&
              (studentType === 'Edel' || userType === 'Monitor') && (
                <EdelCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {absentType === 'dorm' &&
              (studentType === 'Genset' || userType === 'Monitor') && (
                <GensetCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {absentType === 'dorm' &&
              (studentType === 'Guest' || userType === 'Monitor') && (
                <GuestCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {absentType === 'dorm' &&
              (studentType === 'Jasmine' || userType === 'Monitor') && (
                <JasmineCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {absentType === 'dorm' &&
              (studentType === 'Annex' || userType === 'Monitor') && (
                <AnnexCoordinate
                  userLocation={initialRegion}
                  onInsideChange={setInside}
                />
              )}
            {((absentType === 'Chapel-RabuMalam' || absentType === 'Chapel-Vesper' || absentType === 'Chapel-Sabat' &&
              [
                'Crystal',
                'Edel',
                'Genset',
                'Guest',
                'Jasmine',
                'Annex',
              ].includes(studentType)) ||
              (absentType === 'Chapel-RabuMalam' || absentType === 'Chapel-Vesper' || absentType === 'Chapel-Sabat' && userType === 'Monitor')) && (
              <ChapelCoordinate
                userLocation={initialRegion}
                onInsideChange={setInside}
              />
            )}

            {userType === 'Monitor' &&
              studentLocations.map(location => (
                <Marker
                  key={location.uid}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={`Student ${location.uid}`}>
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../../assets/images/face.png')}
                  />
                </Marker>
              ))}
          </>
        )}
      </MapView>
      <Pressable
        style={({pressed}) => [
          styles.backBtn,
          pressed ? styles.buttonPressed : styles.buttonNotPressed,
          {opacity: pressed ? 0.5 : 1},
        ]}
        onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
      {(userType === 'Monitor' || userType === 'Student') && (
        <Pressable
          style={({pressed}) => [
            styles.focusMonitorZO,
            pressed ? styles.buttonPressed : styles.buttonNotPressed,
            {opacity: pressed ? 0.5 : 1},
          ]}
          onPress={focusOnMonitor}>
          <View>
            <Image source={ZoomOut} style={{width: 20, height: 20}} />
          </View>
        </Pressable>  
      )}
      {userType === 'Monitor' && (
        <Pressable
          style={({pressed}) => [
            styles.floatingButton,
            pressed ? styles.buttonPressed : styles.buttonNotPressed,
            {opacity: pressed ? 0.5 : 1},
          ]}
          onPress={absenNow?handleAbsentNowPress: handleNotifyStudent}>
          <Text style={styles.buttonText}>
            {
              absenNow? 'ABSENT NOW' :'NOTIFY STUDENT'
            }
            </Text>
        </Pressable>
      )}
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity as needed
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator
            size="large"
            color="#FFFF" // Change the color to your desired color
          />
          <Text style={styles.loadingText}>Searching for all students...</Text>
        </View>
      )}
    </View>
  );
};




export default MainLoc;

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 18,
  },
  focusMonitorZO: {
    position: 'absolute',
    top: 55,
    right: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 5,
  },
  focusMonitorZI: {
    position: 'absolute',
    top: 13,
    right: 55,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 5,
  },

  backBtn: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 170,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 80,
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
