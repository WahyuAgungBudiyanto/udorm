import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import { BackHome } from '../../assets/images';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeSession} from '../../utils/LocalStorage';

const HomeStudent = ({navigation}) => {
  const [uid, setUid] = useState();

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
      removeSession('userSession');
      //console.log("Signed Out Success")
      navigation.navigate('SignIn');
    } else {
      console.log('Error');
      // or show an error message to the user
    }
  };
  const mapsGo = () => {
    navigation.navigate('MainLoc');
    
  };
  const ProfileGo = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView style={styles.container}>
      
        {/* <Image source={BackHome} style={{width: 300, height: 100}} /> */}
     
      <Label title="HomeStudent"></Label>
      <Button
        title="SignOut"
        color="#7BC9DE"
        textColor="white"
        onPress={SignOutUser}
      />
      <Gap height={8} />
      <Button title="Maps" color="#7BC9DE" textColor="white" onPress={mapsGo} />
      <Gap height={8} />
      <Button
        title="Profile"
        color="#7BC9DE"
        textColor="white"
        onPress={ProfileGo}
      />
    </ScrollView>
  );
};

export default HomeStudent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
  },
  
});
