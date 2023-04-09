import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Modal, Text, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import authentication, {db} from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';
import {getData, removeData} from '../../utils/LocalStorage';

const HomeMonitor = ({navigation}) => {
  const [uid, setUid] = useState();
  const [showModal, setShowModal] = useState(false);
  const db = getDatabase();

  const handleStackNav = () =>{
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'SplashScreen'},
        ],
      })
    );
    BackHandler.exitApp()
}


  // function removeToken() {
  //   const studentRef = r(db, `Student/${uid}/tokenpn`);
  //   set(studentRef, '')
  //     .then(() => {
  //       console.log("Token updated successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating token: ", error);
  //     });
  // }


  useEffect(() => {
    getData('userSession').then(data => {
      setUid(data.uid);
      console.log('data di user session monitor:', data);
    });
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const SignOutUser = () => {
      signOut(authentication)
        .then(re => {
          console.log(re);
          setIsSignedIn(false);
          handleSignOutNavigate();
        })
        .catch(error => {
          console.log(error);
        });
  };

  const handleSignOutNavigate = () => {
    if (isSignedIn == false) {
      removeData('userSession');
      //console.log("Signed Out Success")
      // removeToken();
      // navigation.replace('SignIn');
      navigation.replace('SplashScreen');
      // BackHandler.exitApp()
      // handleStackNav()
    } else {
      console.log('Error');
      // or show an error message to the user
    }
  };

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


  const updateAbsentType = async absentType => {
    const db = getDatabase();
    const userType = await checkUserType(uid);

    if (userType === 'Monitor') {
      update(r(db, `Monitor/${uid}`), {
        absentType: absentType,
      });
    } else {
      console.log('User is not a Monitor');
    }
  };

  const ProfileGo = () => {
    navigation.navigate('ProfileMonitor');
  };

  return (
    <ScrollView style={styles.container}>
      <Label title="HomeMonitor"></Label>
      <Button
        title="SignOut"
        color="#7BC9DE"
        textColor="white"
        onPress={SignOutUser}
      />
      <Gap height={8} />
      {/* <Button title="Maps" color="#7BC9DE" textColor="white" onPress={mapsGo} /> */}
      <Button
        title="Maps"
        color="#7BC9DE"
        textColor="white"
        onPress={() => setShowModal(true)}
      />
      <Gap height={8} />
      <Button
        title="Profile"
        color="#7BC9DE"
        textColor="white"
        onPress={ProfileGo}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Absent Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                updateAbsentType('dorm');
                navigation.navigate('MainLoc', {absentType: 'dorm'});
                resetStudentLocations();
                setShowModal(false);
              }}>
              <Text style={styles.modalButtonText}>Dorm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                updateAbsentType('Chapel-RabuMalam');
                navigation.navigate('MainLoc', {
                  absentType: 'Chapel-RabuMalam',
                });
                resetStudentLocations();
                setShowModal(false);
              }}>
              <Text style={styles.modalButtonText}>Chapel-RabuMalam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                updateAbsentType('Chapel-Vesper');
                navigation.navigate('MainLoc', {absentType: 'Chapel-Vesper'});
                resetStudentLocations();
                setShowModal(false);
              }}>
              <Text style={styles.modalButtonText}>Chapel-Vesper</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                updateAbsentType('Chapel-Sabat');
                navigation.navigate('MainLoc', {absentType: 'Chapel-Sabat'});
                resetStudentLocations();
                setShowModal(false);
              }}>
              <Text style={styles.modalButtonText}>Chapel-Sabat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 15,
                borderRadius: 5,
                marginVertical: 20,
              }}
              onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeMonitor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  modalButton: {
    backgroundColor: '#7BC9DE',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
