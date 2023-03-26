import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';
import {Header, Button, TextInput, Gap, Label} from '../../components';

import authentication, {db} from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {ref as r, onValue, off, getDatabase, child, get, update} from 'firebase/database';


const HomeMonitor = ({navigation}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uid = authentication.currentUser.uid;
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
      console.log("Signed Out Success")
      navigation.navigate('SignIn');
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



  const mapsGo = () => {
    resetStudentLocations();

    Alert.alert(
      'Select Absent Type',
      'Please choose the absent type:',
      [
        {
          text: 'Dorm',
          onPress: () => {
            updateAbsentType('dorm');
            navigation.navigate('MainLoc', {absentType: 'dorm'});
          },
        },
        {
          text: 'Chapel',
          onPress: () => {
            updateAbsentType('chapel');
            navigation.navigate('MainLoc', {absentType: 'chapel'});
          },
        },
      ],
      {cancelable: true},
    );
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
      <Button title="Maps" color="#7BC9DE" textColor="white" onPress={mapsGo} />
    </ScrollView>
  );
};

export default HomeMonitor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
  },
  
});
