import React, {useState, useEffect} from 'react';
import {
StyleSheet,
View,
TouchableOpacity,
ScrollView,
Image,
Dimensions,
Text,
Pressable,
} from 'react-native';
import {
mainBackground,
} from '../../assets/images';
import {Modal, TextInput as RNTextInput} from 'react-native';
import {HomeLogo, profileLogo, LogoutLogo, EditPen} from '../../assets/icons';
import authentication from '../../config/firebase-config';
import {signOut} from 'firebase/auth';
import {getData, removeData} from '../../utils/LocalStorage';
import { query, orderByChild, equalTo, get, ref, update, getDatabase, onValue } from 'firebase/database';
import {TextInput, DataTable, Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {LogoAbsentBtn} from '../../assets/images';
const {width, height} = Dimensions.get('window');
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7BC9DE', // The focused outline color
    surface: '#2196F3', // The outline color
  },
};
const ViewAbsent = ({navigation}) => {
    const [studentsData, setStudentsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);


    useEffect(() => {
      const fetchData = async () => {
        const db = getDatabase();
        const studentsRef = ref(db, 'Student');
        const onValueChange = onValue(
          studentsRef,
          snapshot => {
            if (snapshot.exists()) {
              const data = Object.values(snapshot.val());
              setStudentsData(data);
              setFilteredData(data);
            } else {
              console.log('No data available');
            }
          },
          error => {
            console.error('Error fetching data:', error);
          },
        );

        // Cleanup function to remove the listener when the component is unmounted
        return () => off(studentsRef, 'value', onValueChange);
      };

      fetchData();
    }, []);


    const handleRowClick = ({Email, Name, points, ...rest}) => {
      setSelectedStudent({Email: Email.split('@')[0], Name, points});
      setModalVisible(true);
    };


    const handleSavePoints = async () => {
      if (selectedStudent) {
        const db = getDatabase();
        const studentsRef = ref(db, 'Student');
        const email = `${selectedStudent.Email}@student.unklab.ac.id`; // Construct the full email
        const queryRef = query(
          studentsRef,
          orderByChild('Email'),
          equalTo(email),
        );
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const key = Object.keys(snapshot.val())[0];
          const studentRef = ref(db, `Student/${key}`);
          await update(studentRef, {points: selectedStudent.points});

          // Close the modal
          setModalVisible(false);
        } else {
          console.log(`No student found with email ${email}`);
        }
      }
    };

    const handleSearch = text => {
    setSearchText(text);
    if (text) {
        setFilteredData(
        studentsData.filter(student => {
            const noRegis = student.Email.split('@')[0];
            return (
            noRegis.includes(text) ||
            student.Name.toLowerCase().includes(text.toLowerCase()) ||
            student.points.toString().includes(text)
            );
        }),
        );
    } else {
        setFilteredData(studentsData);
    }
    };

    const goProfile = () => {
        navigation.navigate('ProfileMonitor');
    };
    const handleSignOutNavigate = () => {
        if (isSignedIn == false) {
        removeData('userSession');
        //console.log("Signed Out Success")
        // removeToken();
        // navigation.replace('SignIn');
        navigation.replace('SplashScreen');
        // BackHandler.exitApp()
        // handleStackNav()
        } else {
        console.log('Error');
        // or show an error message to the user
        }
    };
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



    const goHome = () => {
        navigation.navigate('HomeMonitor');
    };
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          {/* Move the ScrollView and its contents here */}
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
          <TextInput
            style={styles.searchInput}
            label="Search by No. Regis, Name, or Points"
            value={searchText}
            onChangeText={handleSearch}
            mode="outlined" // Added mode to make the TextInput have an outline
          />

          <ScrollView>
            <DataTable style={styles.dataTable}>
              <DataTable.Header style={styles.header}>
                <DataTable.Title style={styles.headerTitle}>
                  No.Regis
                </DataTable.Title>
                <DataTable.Title style={styles.headerTitle}>
                  Name
                </DataTable.Title>
                <DataTable.Title numeric style={styles.headerTitle}>
                  Points
                </DataTable.Title>
                <DataTable.Title numeric style={styles.headerTitle}>
                  Edit
                </DataTable.Title>
              </DataTable.Header>

              {filteredData.map((student, index) => (
                <DataTable.Row key={index} style={styles.row}>
                  <DataTable.Cell style={styles.cell}>
                    {student.Email.split('@')[0]}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {student.Name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cell}>
                    {student.points}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cell}>
                    <TouchableOpacity onPress={() => handleRowClick(student)}>
                      <EditPen width={50} height={50} />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>

          {/* Move the modal component just above the ImageBackground component */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Update Points</Text>
                <RNTextInput
                  style={styles.pointsInput}
                  keyboardType="numeric"
                  value={selectedStudent?.points?.toString()}
                  onChangeText={text =>
                    setSelectedStudent({
                      ...selectedStudent,
                      points: text ? parseInt(text) : 0,
                    })
                  }
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleSavePoints}>
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </PaperProvider>
    );

};

export default ViewAbsent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  background: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.07,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  editButtonText: {
    color: '#7BC9DE',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#7BC9DE',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  pointsInput: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#7BC9DE',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
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
  dataTable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    backgroundColor: '#7BC9DE',
    borderRadius: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  cell: {
    color: '#333333',
  },
});
