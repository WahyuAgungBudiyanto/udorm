import {StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { BackHome, NotifIcon, mainBackground, LogoAbsentBtn, Face } from '../../assets/images';
import { HomeLogo, profileLogo, LogoutLogo } from '../../assets/icons';
const {width, height} = Dimensions.get('window');
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeData} from '../../utils/LocalStorage';
import { Label } from '../../components';


const ProfilStudent = ({navigation}) => {
  const [uid, setUid] = useState();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [faculty, setFaculty] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [studentType, setstudentType] = useState('');
  const [totalPoints, settotalPoints] = useState('');
  const isSmallScreen = width < 375;
  const db = getDatabase();

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
            setEmail(userData.Email);
            setstudentType(userData.StudentType)
            setGender(userData.Gender)
            setFaculty(userData.Faculty)
            setParentNumber(userData.Parent)
            settotalPoints(userData.points)

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

  const goHome = () => {
    navigation.navigate('HomeStudent');
  };
  return (
    <View style={styles.container}>
      <View style={styles.menuBtn}>
        <TouchableOpacity onPress={goHome}>
          <Image source={HomeLogo} style={styles.homeLogo} />
          <Text style={styles.homeBar}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
          <Text
            style={[
              styles.nameTxt,
              isSmallScreen
                ? styles.smallSdashboardTxt
                : styles.bigSdashboardTxt,
            ]}>
            {`${userName}`}
          </Text>
          <Text
            style={[
              styles.studentTypeText,
              isSmallScreen
                ? styles.smallstudentTypeText
                : styles.bigstudentTypeText,
            ]}>
            {`${studentType}`} Dormitory
          </Text>
        </View>
        <Image source={Face} style={styles.faceIcon} />
        <View
          style={{
            width: 200,
            height: 220,
            backgroundColor: '#7BC9DE',
            alignSelf: 'center',
            borderRadius: 50,
            width: width * 0.8,
            marginTop: 20,
          }}>
          <Label
            title="Information"
            textColor="#FFFF"
            textSize={30}
            mT={20}
            mL={20}></Label>
            <View style={{flexDirection: 'row'}}>
            <Label title="Email: " textColor="#FFFF" textSize={15} mL={20}></Label>
          <Text style={{color: 'white', top: 1}}>{`${email}`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Label title="Gender: " textColor="#FFFF" textSize={15} mL={20}></Label>
          <Text style={{color: 'white', top: 1}}>{`${gender}`}</Text>
          </View>
           <View style={{flexDirection: 'row'}}>
            <Label title="Faculty: " textColor="#FFFF" textSize={15} mL={20}></Label>
          <Text style={{color: 'white', top: 1}}>{`${faculty}`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Label title="Parents Number: " textColor="#FFFF" textSize={15} mL={20}></Label>
          <Text style={{color: 'white', top: 1}}>{`${parentNumber}`}</Text>
          </View>
          <Label title="Points" textColor="#FFFF" textSize={30} tALight='center' mT={5} ></Label>
          <Text style={{color: 'white', fontSize:30, textAlign:'center', fontWeight:'bold'}}>{`${totalPoints}`}</Text>
        </View>
      </ScrollView>
      <Text>ProfilStudent</Text>
    </View>
  );
}

export default ProfilStudent;

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
  background: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.07,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  nameTxt: {
    position: 'absolute',
    color: '#FFFF',
    zIndex: 1,
    fontWeight: 'bold',
    top: width * 0.08,
    left: width * 0.03,
  },
  smallSdashboardTxt: {
    fontSize: width * 0.04,
  },
  bigSdashboardTxt: {
    fontSize: width * 0.09,
  },
  studentTypeText: {
    position: 'absolute',
    color: '#F3EFEF',
    zIndex: 1,
    fontWeight: 'bold',
    top: width * 0.2,
    left: width * 0.04,
  },
  smallstudentTypeText: {
    fontSize: width * 0.04,
  },
  bigstudentTypeText: {
    fontSize: width * 0.04,
  },
  homeLogo: {
    width: width * 0.08,
    height: height * 0.04,
    zIndex: 1,
    position: 'absolute',
    right: width * 0.27,
    marginBottom: 10,
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
  faceIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});