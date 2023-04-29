import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import moment from 'moment';
import {useState, useEffect} from 'react';
import {HomeLogo, profileLogo, LogoutLogo} from '../../assets/icons';
import {
  BackHome,
  NotifIcon,
  mainBackground,
  LogoAbsentBtn,
  HistoryIcon,
} from '../../assets/images';
import {getData, removeData} from '../../utils/LocalStorage';
import {ref as r, onValue, off, getDatabase, child, get, update} from 'firebase/database';
import {getSheetData} from '../../config/GoogleSheetsAPI';
import React from 'react';
const {width, height} = Dimensions.get('window');
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Gap } from '../../components';


const ViewHistory = ({navigation}) => {
  const [sheetData, setSheetData] = useState([]);
  const [uid, setUid] = useState();
   const [Email, setEmail] = useState('');
   const [filteredSheetData, setFilteredSheetData] = useState([]);
   const db = getDatabase();
   const [userType, setUserType] = useState(null);
   useEffect(() => {
     getData('userSession').then(data => {
       setUid(data.uid);
       //console.log('data di user session monitor:', data);
     });
   }, []);
   const fetchUserDataRealtime = async () => {
     const userType = await checkUserType(uid);

     const userRef = r(
       db,
       userType === 'Monitor' ? `Monitor/${uid}` : `Student/${uid}`,
     );
     const onValueChange = onValue(
       userRef,
       snapshot => {
         if (snapshot.exists()) {
           const userData = snapshot.val();
           setEmail(userData.Email.split('@')[0]);

           let filteredData;
           if (userType === 'Monitor') {
             // If user is a Monitor, show all data
             filteredData = sheetData;
           } else {
             // If user is a Student, filter data based on Email
             filteredData = sheetData.filter(item => {
               return item[2].split('@')[0] === userData.Email.split('@')[0];
             });
           }

           // Update the state with the filtered data
           setFilteredSheetData(filteredData);
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
       (async () => {
         await fetchUserDataRealtime();
       })();
     }
   }, [uid]);
   useEffect(() => {
     // Filter data based on user type
     const dataWithoutHeader = sheetData.slice(1);

  // Filter data based on user type
  const filteredData = dataWithoutHeader.filter(item => {
    if (userType === 'Monitor') {
      // If user is a Monitor, show all data
      return true;
    } else {
      // If user is a Student, filter data based on Email
      return item[2].split('@')[0] === Email;
    }
  });
     // Update the state with the filtered data
     setFilteredSheetData(filteredData);
     
   }, [sheetData, userType, Email]);


   const checkUserType = async uid => {
     const db = getDatabase();

     // Check if the user exists in the Monitor section
     const monitorRef = r(db, `Monitor/${uid}`);
     const monitorSnapshot = await get(monitorRef);
     if (monitorSnapshot.exists()) {
       setUserType('Monitor');
       return 'Monitor';
     }

     // Check if the user exists in the Student section
     const studentRef = r(db, `Student/${uid}`);
     const studentSnapshot = await get(studentRef);
     if (studentSnapshot.exists()) {
       setUserType('Student');
       return 'Student';
     }

     setUserType(null);
     return null;
   };

   

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getSheetData('HISTORY');
      if (data && data.length > 0) {
        const sortedData = data.sort((a, b) => {
          const dateA = moment(a[1], 'MMMM DD, YYYY, hh:mm:ss A').toDate();
          const dateB = moment(b[1], 'MMMM DD, YYYY, hh:mm:ss A').toDate();
          return dateB - dateA;
        });
        setSheetData(sortedData);
      }
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    }
  };

  fetchData(); // Fetch data immediately when the component mounts

  const interval = setInterval(() => {
    fetchData();
  }, 10000); // Call fetchData() every 20 seconds

  return () => clearInterval(interval); // Clear interval on unmount
}, []);




  const goProfile = () => {
    if (userType === 'Monitor') {
      navigation.navigate('ProfileMonitor');
    } else {
      navigation.navigate('ProfileStudent');
    }
  };
  const goHome = () => {
    if (userType === 'Monitor') {
      navigation.navigate('HomeMonitor');
    } else {
      navigation.navigate('HomeStudent');
    }
  };
  useEffect(() => {
    getData('userSession').then(data => {
      setUid(data.uid);
    });
  }, []);
  
const timeDifference = dateString => {
  const historyDate = moment(dateString, 'MMMM DD, YYYY, hh:mm:ss A');
  const currentDate = moment();

  if (!historyDate.isValid()) {
    return 'Invalid Date';
  }

  const duration = moment.duration(currentDate.diff(historyDate));
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years > 0) {
    return `${years} ${years > 1 ? 'years' : 'year'} ago`;
  } else if (months > 0) {
    return `${months} ${months > 1 ? 'months' : 'month'} ago`;
  } else if (days > 0) {
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
  } else {
    return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
  }
};


  const SignOutUser = () => {
    removeData('userSession');
    navigation.replace('SignIn');
  };
  
const renderItem = ({item, index}) => {
  // Removed the conditional statement that skips the first row (headers)



  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationRow}>
        {/* <Text style={styles.notificationColumnLeft}>{item[0]}</Text> */}
        <Text style={styles.notificationColumnMiddle}>
          {item[3] + ' is ' + item[4] + ' the ' + item[5]}
        </Text>
      </View>
      <Text style={styles.notificationTimestamp}>
        {timeDifference(item[1])}
      </Text>
      
    </View>
  );
};

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
    <Text style={styles.title}>Notification History</Text>
    <View style={{flex: 1, marginBottom:80}}>
      <FlatList
        data={filteredSheetData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        reverse={true}
        refreshing={false}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  </View>
);

};

export default ViewHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,

    backgroundColor: '#fff',
  },
  title: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7BC9DE',
    marginBottom: 16,
  },
  notificationItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,

    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7BC9DE',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationText: {
    color: 'black',
    marginBottom: 8,
  },
  notificationTimestamp: {
    color: '#999',
    fontSize: 12,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationColumnLeft: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  notificationColumnMiddle: {
    flex: 1,
    fontSize: 15,
    color: 'black',
  },
  notificationColumnRight: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },

  NotifIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    top: width * 0.05,
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
});
