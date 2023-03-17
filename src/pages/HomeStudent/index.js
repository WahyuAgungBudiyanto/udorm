import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';

import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';

const HomeStudent = ({navigation}) => {
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
      console.log("Signed Out Success")
      navigation.navigate('SignIn');
    } else {
      console.log('Error');
      // or show an error message to the user
    }
  };
  const mapsGo = () => {
   
    navigation.navigate('MainLoc');
    
  };

  return (
    <ScrollView style={styles.container}>
      <Label title="HomeStudent"></Label>
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

export default HomeStudent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
  },
  
});
