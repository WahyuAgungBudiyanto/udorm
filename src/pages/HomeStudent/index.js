import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import { BackHome } from '../../assets/images';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import { removeSession } from '../../utils/LocalStorage';
import { BackHandler } from 'react-native';

const HomeStudent = ({navigation}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);


  const SignOutUser = () => {
   removeSession('userSession')
  //  .then(()=>navigation.navigate('SignIn'))
   .then(()=>BackHandler.exitApp())
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
