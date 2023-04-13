import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, BackHandler, Dimensions, Text, ImageBackground, Pressable} from 'react-native';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import { BackHome, NotifIcon, mainBackground, LogoAbsentBtn } from '../../assets/images';
import { HomeLogo, profileLogo, LogoutLogo } from '../../assets/icons';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeData} from '../../utils/LocalStorage';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';
import { CommonActions } from '@react-navigation/native';
const {width, height} = Dimensions.get('window')
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
console.log('Screen Width :', screenWidth);
console.log('Screen Height :', screenHeight);


const HomeStudent = ({navigation}) => {
  const [uid, setUid] = useState();
  const [date, setDate] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [encourageText, setEncourageText] = useState('Follow the rules to make a better learning environment!');
 
   useEffect(() => {
     getData('userSession').then(data => {
       setUid(data.uid);
       //console.log('data di user session monitor:', data);
     });
   }, []);

  const fetchUserDataRealtime = () => {
    const userRef = r(db, `Student/${uid}`);
    const onValueChange = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          //console.log('User data:', userData);
          

          setUserName(userData.Name);
          
          // Set other state variables for other properties if needed
        } else {
          console.log('No data available for the user.');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      },
    );

    // Cleanup function to remove the listener when the component is unmounted
    return () => off(userRef, 'value', onValueChange);
  };
 useEffect(() => {
   if (uid) {
     fetchUserDataRealtime();
   }
 }, [uid]);


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);

  const db = getDatabase();

  const handleStackNav = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'SplashScreen'}],
      }),
    );
    BackHandler.exitApp();
  };

  function removeToken() {
    const studentRef = r(db, `Student/${uid}/tokenpn`);
    set(studentRef, '')
      .then(() => {
        //console.log("Token updated successfully!");
      })
      .catch(error => {
        console.error('Error updating token: ', error);
      });
  }

 
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

  const goProfile = () => {
    navigation.navigate('ProfileStudent')
  };
  const encourageList = [
  'Follow the rules to make a better learning environment!',
  'Respect the rules and your peers!',
  'Obeying the rules shows that you are responsible!',
  'The rules are there to protect you and your classmates!',
  'By obeying the rules, you set a good example for others!',
  'Remember that breaking the rules can have consequences!',
  'The rules apply to everyone, so it is important to obey them!',
  'When you follow the rules, you help create a safe and fair environment!',
  'Obeying the rules shows that you are mature and responsible!',
  'The rules are in place to help you succeed in school!',
  'Respecting the rules shows that you value your education!',
  'Obeying the rules is a sign of respect and discipline!',
  'By following the rules, you help maintain a positive atmosphere!',
  'Remember that breaking the rules can lead to missed opportunities!',
  'The rules are important for maintaining order and structure!',
  'Obeying the rules is a way to show that you care about your education!',
  'The rules help keep everyone safe and protected!',
  'Following the rules helps build a sense of community and teamwork!',
  'Respecting the rules shows that you take your education seriously!',
  'Obeying the rules helps create a fair and just environment for all!',
  'Remember that following the rules is a sign of strength, not weakness!',
  'The rules are there to help you succeed, so don\'t take them lightly!',
  'Obeying the rules is a sign of maturity and responsibility!',
  'By respecting the rules, you help build a positive learning environment!',
  'Remember that breaking the rules can have consequences that last a lifetime!',
  'The rules are there to help you reach your full potential!',
  'Obeying the rules shows that you are committed to your education!',
  'The rules are an important part of maintaining discipline and structure!',
  'Respecting the rules is a way to show that you value your education!',
  'Obeying the rules is a sign of respect and professionalism!',
  'Following the rules helps create a positive and productive learning environment!',
  'Remember that breaking the rules can have negative consequences for everyone!',
  'The rules are there to help you succeed, so don\'t take them for granted!',
  'Obeying the rules shows that you take your education seriously!',
  'The rules help keep everyone accountable and responsible!',
  'By respecting the rules, you help build a positive and productive community!',
  'Remember that breaking the rules can have serious consequences!',
  'The rules are there to help you grow and develop as a person!',
  'Obeying the rules shows that you are committed to your education and your future!',
  'The rules are important for maintaining order and structure in school!',
  'Respecting the rules is a way to show that you value your education and your peers!',
  'Obeying the rules helps build a positive and productive learning environment!',
  'Remember that breaking the rules can lead to missed opportunities and regrets!',
  'The rules are there to help you succeed, so don\'t take them lightly!',
  'Obeying the rules shows that you are responsible and reliable!',
  'Following the rules helps create a sense of unity and belonging!',
  'Remember that breaking the rules can have negative consequences for your peers as well!',
  'The rules are there to help you achieve your goals and aspirations!',
  'Obeying the rules shows that you take your education seriously and care about your future!',
  ]
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * encourageList.length);
      setEncourageText(encourageList[randomIndex]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
 
  return (
    <View style={styles.container}>
      <View style={styles.menuBtn}>
        <TouchableOpacity>
          <Image source={HomeLogo} style={styles.homeLogo} />
          <Text style={styles.homeBar}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goProfile}>
          <Image source={profileLogo} style={styles.profileLogo} />
          <Text style={styles.profileBar}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={SignOutUser}>
          <Image source={LogoutLogo} style={styles.logoutLogo} />
          <Text style={styles.logoutBar}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Image source={mainBackground} style={styles.background} />
      <ScrollView style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image source={BackHome} style={{width: width * 1}} />
          <Image source={NotifIcon} style={styles.NotifIcon} />
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.nameTxt}>
            Welcome Back, {userName}
          </Text>
          <View style={styles.quotes}>
            <Text style={styles.quotesText}>{encourageText}</Text>
          </View>
        </View>
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#7BC9DE',
            alignSelf: 'center',
            borderRadius: 50,
            width: width * 0.8,
            marginTop: 20,
            justifyContent: 'center',
          }}>
          <TouchableOpacity style={{marginBottom: 10}} onPress={mapsGo}>
            <Image source={LogoAbsentBtn} style={styles.absentBtn} />
            <Label
              title="Absent"
              jContent="center"
              tALight="center"
              textColor="#FFFF"
              textSize={20}></Label>
          </TouchableOpacity>

          {/* <Button title="Maps" color="#7BC9DE" textColor="white" onPress={mapsGo}><Image source={LogoAbsentBtn} style={styles.absentBtn} /></Button> */}
        </View>
        <View
          style={{
            width: 200,
            height: 500,
            backgroundColor: '#7BC9DE',
            alignSelf: 'center',
            borderRadius: 50,
            width: width * 0.8,
            marginTop: 20,
            justifyContent: 'center',
          }}></View>
      </ScrollView>
    </View>
  );
};
export default HomeStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  imageWrapper: {
    position: 'relative',
  },
  nameTxt: {
    position: 'absolute',
    color: '#FFFF',
    zIndex: 1,
    fontWeight: 'bold',
    top: width * 0.06,
    left: width * 0.03,
    fontSize: width * 0.055,
  },

  dateText: {
    fontSize: width * 0.03,
    color: '#FFFF',
    position: 'absolute',
    top: width * 0.03,
    left: width * 0.03,
    zIndex: 1,
    fontWeight: 'bold',
  },
  NotifIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    top: width * 0.05,
  },
  homeLogo: {
    width: width * 0.08,
    height: height * 0.04,
    zIndex: 1,
    position: 'absolute',
    right: width * 0.27,
    marginBottom: 10
  },
  profileLogo: {
    width: width * 0.11,
    height: height * 0.05,
    position: 'absolute',
    zIndex: 1,
    left: 1,
    bottom: width * 0.01,
  },
  logoutLogo: {
    width: width * 0.09,
    height: height * 0.04,
    position: 'absolute',
    zIndex: 1,
    left: width * 0.27,
    bottom: width * 0.07,
  },
  homeBar: {
    color: '#7BC9DE',
    right: width * 0.24,
    top: height * 0.04,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  profileBar: {
    color: '#7BC9DE',
    left: width * 0.001,
    top: height * 0.015,
    fontSize: width * 0.04,
  },
  logoutBar: {
    color: '#7BC9DE',
    left: width * 0.25,
    fontSize: width * 0.04,
    bottom: height * 0.01,
  },
  background: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.07,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  absentBtn: {
    width: width * 0.2,
    height: height * 0.1,
    alignSelf: 'center',
    marginBottom: 1,
  },
  menuBtn: {
    position: 'absolute',
    bottom: height * 0.02,
    alignSelf: 'center',
    paddingHorizontal: width * 0.3,
    paddingTop: height * 0.02,
    borderRadius: 30,
    backgroundColor: '#FFFF',
    zIndex: 100,
  },
  quotes: {
    width: width * 0.53,
    height: height * 0.10,
    backgroundColor: '#7BC9DE',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 60,
    left: 10,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 40,
    borderColor: '#FFFF',
    borderWidth: 0.2,
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
  },
  quotesText: {
    color: '#FFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: width * 0.03,
  },
});
