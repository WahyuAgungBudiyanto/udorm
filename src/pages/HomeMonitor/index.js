import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Modal, Text, BackHandler, Linking, Image, Dimensions } from 'react-native';
import { Label, Gap} from '../../components';
import { BackHome, NotifIcon, mainBackground, LogoAbsentBtn, HistoryIcon, Info, Image1, Image2} from '../../assets/images';
import {HomeLogo, profileLogo, LogoutLogo} from '../../assets/icons';
import authentication, {db} from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';
import {getData, removeData} from '../../utils/LocalStorage';
const {width, height} = Dimensions.get('window');

const HomeMonitor = ({navigation}) => {
const [uid, setUid] = useState();
const [showModal, setShowModal] = useState(false);
const [date, setDate] = useState(new Date());
const [userName, setUserName] = useState('');
const isSmallScreen = width < 375;
const [encourageText, setEncourageText] = useState('Hope you have a great day, even with this task ahead of you!');
const db = getDatabase();
const [absentStudents, setAbsentStudents] = useState([]);



const fetchUserDataRealtime = () => {
  const userRef = r(db, `Monitor/${uid}`);
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
  fetchUserDataRealtime();
});

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

const handleStackNav = () => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'SplashScreen'}],
    }),
  );
  BackHandler.exitApp();
};

useEffect(() => {
  getData('userSession').then(data => {
    setUid(data.uid);
    //console.log('data di user session monitor:', data);
  });
}, []);
  function removeToken() {
    const studentRef = r(db, `Monitor/${uid}/tokenpn`);
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
    // removeToken();
    removeToken();
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

const goProfile = () => {
  navigation.navigate('ProfileMonitor');
};
const goHome = () => {
  navigation.navigate('HomeMonitor');
};
const goNotif = () => {
  navigation.navigate('ViewHistory');
};
  const goHistory = () => {
    // Linking.openURL();
    navigation.navigate('ViewAbsent');
  };

  const encourageList = [
    'Hope you have a great day, even with this task ahead of you!',
  'Your diligence and attention to detail is appreciated.',
  'Remember that every little bit counts in making a difference.',
  'You are making a positive impact by checking in on absent students!',
  'Thank you for your hard work and dedication to keeping everyone safe.',
  'You are doing important work that is appreciated by everyone in the dorm.',
  'We are lucky to have someone like you taking care of our dormitory!',
  'It is not easy to have this responsibility, but you are doing an amazing job!',
  'Your work ethic and dedication are an inspiration to us all.',
  'Keep up the great work, we are grateful for all that you do!',
  'Your efforts are making our dormitory a better place.',
  'You are appreciated more than you know!',
  'Thank you for looking out for the safety and well-being of all students in the dorm.',
  'Your work is vital to creating a positive living environment.',
  'You are an important member of our dorm community.',
  'We are fortunate to have someone as responsible and dedicated as you!',
  'Remember that your hard work is making a difference in our community.',
  'Thank you for being there for us and keeping us safe.',
  'Your attention to detail is essential for ensuring everyones safety.',
  'You are appreciated more than words can express!',
  'Your work is important and valued by everyone in the dorm.',
  'You are making a positive difference in our dorm community!',
  'We couldn\'t do it without you!',
  'Thank you for being such a reliable and trustworthy monitor.',
  'Your commitment to your duties is truly inspiring!',
  'Your efforts are making our dorm a better place to live.',
  'Thank you for being such an important part of our dormitory.',
  'Your dedication to keeping everyone safe is greatly appreciated.',
  'You are doing an amazing job, keep it up!',
  'We are so grateful for your hard work and dedication!',
  'Your attention to detail is crucial in maintaining a safe and healthy dormitory.',
  'You are a true asset to our dorm community.',
  'Your work is important and valued, thank you for all that you do!',
  'We are lucky to have someone as responsible and dependable as you.',
  'Your work is making a positive impact on everyone in the dormitory.',
  'Thank you for being such an important part of our dorm community.',
  'Your commitment to your duties is making a big difference!',
  'We appreciate your hard work and dedication to keeping everyone safe.',
  'You are doing an amazing job, thank you!',
  'Your work is helping to create a safe and healthy living environment.',
  'Thank you for being such a reliable and responsible monitor!',
  'Your efforts are truly appreciated by everyone in the dorm.',
  'We are so lucky to have someone as hardworking and dedicated as you.',
  'Your work is important and essential to our dorm community!',
  'Thank you for always being there for us and keeping us safe.',
  'Your attention to detail is making a big difference!',
  'You are doing important work that is appreciated by everyone in the dormitory.',
  'We are grateful for your commitment to keeping everyone safe and healthy.',
  'Your work is making a positive impact on our dormitory.',
  'Thank you for being such a valuable member of our dorm community.',
  'Your efforts are truly appreciated, keep up the great work!',
  'We couldn\'t ask for a better monitor than you!',
  ];
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
      <TouchableOpacity onPress={goHome}>
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
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity onPress={goNotif}>
            <NotifIcon width={25} height={25} />
          </TouchableOpacity>
        </View>

        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text
          style={[
            styles.nameTxt,
            isSmallScreen ? styles.smallSdashboardTxt : styles.bigSdashboardTxt,
          ]}>
          Welcome Back, {`${userName}`}
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginBottom: 10, paddingLeft: 50}}
            onPress={() => setShowModal(true)}>
            <LogoAbsentBtn width={90} height={80} />
            <Label
              title="Absent"
              jContent="center"
              tALight="center"
              textColor="#FFFF"
              textSize={20}></Label>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginBottom: 10, paddingLeft: 40}}
            onPress={goHistory}>
            <HistoryIcon width={80} height={80} />
            {/* <Image source={HistoryIcon} style={styles.absentBtn} /> */}
            <Label
              title="View Student"
              jContent="center"
              tALight="center"
              textColor="#FFFF"
              textSize={20}></Label>
            {/* {sheetData.map((row, index) => (
              <Text style={{color: 'black'}} key={index}>
                {row.join(', ')}
              </Text>
            ))} */}
          </TouchableOpacity>
        </View>
        {/* <Button title="Maps" color="#7BC9DE" textColor="white" onPress={mapsGo}><Image source={LogoAbsentBtn} style={styles.absentBtn} /></Button> */}
      </View>
      <View
        style={{
          width: '100%',
          height: 500,
          backgroundColor: '#7BC9DE',
          alignSelf: 'center',
          borderRadius: 50,
          width: width * 0.8,
          marginTop: 20,
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <View style={{position: 'absolute', top: '5%', left: '5%'}}>
          <Label textColor="white" textSize={25} title="What's New" />
          <Label
            textColor="white"
            textSize={15}
            title="Latest news from Unklab"
          />

          <View style={{flexDirection: 'row'}}>
            <Image1
              style={{marginTop: 10, marginRight: 10, zIndex: 1}}
              width={130}
              height={130}
            />
            <View style={{marginTop: '5%', marginRight: '5%', zIndex: 1}}>
              <Label textColor="white" textSize={20} title="UDORM LAUNCHED" />
              <Label
                textColor="white"
                textSize={15}
                title="Unduh sekarang juga di https://...."
              />
              <Label
                textColor="white"
                textSize={15}
                title="Harvi            10 April 2023"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image2
              style={{marginTop: 10, zIndex: 1}}
              width={130}
              height={130}
            />
            <View style={{marginTop: 50, left: 10}}>
              <Label textColor="white" textSize={20} title="CHAPEL IS HERE" />
              <Label
                textColor="white"
                textSize={15}
                title="Come and Join us at....

"
              />
              <Label
                textColor="white"
                textSize={15}
                title="Harvi            1 April 2023"
              />
            </View>
          </View>
        </View>
      </View>

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
  </View>
);
};

export default HomeMonitor;

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
    top: width * 0.08,
    left: width * 0.03,
  },
  smallSdashboardTxt: {
    fontSize: width * 0.04,
  },
  bigSdashboardTxt: {
    fontSize: width * 0.05,
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
  notificationIconContainer: {
    padding: 5,
    position: 'absolute',
    top: width * 0.03,
    right: width * 0.03,
    zIndex: 1,
  },
  NotifIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },

  menuBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.8, // 80% of the screen width
    height: 70,
    position: 'absolute',
    bottom: 20,
    left: width * 0.1, // Center the menuBtn horizontally by setting left to 10% of the screen width
    backgroundColor: '#FFFF',
    borderRadius: 30, // Add rounded corners to match the padding
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    zIndex: 1000,
    padding: 20, // Add padding to the container
  },
  homeLogo: {
    width: '120%',
    height: '120%',
    resizeMode: 'contain',
  },
  profileLogo: {
    width: '130%',
    height: '130%',
    resizeMode: 'contain',
  },
  logoutLogo: {
    width: '120%',
    height: '120%',
    resizeMode: 'contain',
  },
  homeBar: {
    textAlign: 'center',
    color: '#7BC9DE',
  },
  profileBar: {
    textAlign: 'center',
    color: '#7BC9DE',
  },
  logoutBar: {
    textAlign: 'center',
    color: '#7BC9DE',
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
    backgroundColor: 'transparent',
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
    color: 'black',
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
  quotes: {
    height: 80,
    backgroundColor: '#7BC9DE',
    alignSelf: 'center',
    borderRadius: 50,
    width: width * 0.55,
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
    padding: 10,
  },
});
