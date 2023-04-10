import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, BackHandler, Dimensions, Text} from 'react-native';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import { BackHome } from '../../assets/images';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeData} from '../../utils/LocalStorage';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';
import { CommonActions } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

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
        //console.log("Token updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating token: ", error);
      });
  }

  useEffect(() => {
    getData('userSession').then(data => {
      setUid(data.uid);
      //console.log('data di user session monitor:', data);
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
    navigation.navigate('ProfileStudent');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={BackHome} style={{width: width * 1}} />
        <Text style={styles.dashboardTxt}>STUDENT DASHBOARD</Text>
      </View>

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
  imageWrapper: {
    position: 'relative',
  },
  dashboardTxt: {
    position: 'absolute',
    top: width* 0.02,
    left: 10,
    zIndex: 1,
    fontSize: 20, 
    fontWeight: 'bold'
  },
});
