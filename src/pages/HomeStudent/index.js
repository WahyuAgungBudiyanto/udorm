import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import { BackHome } from '../../assets/images';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeData} from '../../utils/LocalStorage';
import {getDatabase, ref as r, get, update, set} from 'firebase/database';
import { CommonActions } from '@react-navigation/native';

const HomeStudent = ({navigation}) => {
  const [uid, setUid] = useState();
  
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


  function removeToken() {
    const studentRef = r(db, `Student/${uid}/tokenpn`);
    set(studentRef, '')
      .then(() => {
        console.log("Token updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating token: ", error);
      });
  }

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
      removeToken();
      // handleStackNav()
      // BackHandler.exitApp()
      navigation.replace('SplashScreen');
    } else {
      console.log('Error');
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
