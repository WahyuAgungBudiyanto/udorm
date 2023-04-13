    import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
    import {React, useState, useEffect} from 'react';
    import {Header, Button, Gap, Label, TextInput, CustomTextInput} from '../../components';
    import {Logo} from '../../assets/images';
    import {Picker} from '@react-native-picker/picker';
    import authentication from '../../config/firebase-config'
    import {signInWithEmailAndPassword} from 'firebase/auth';
    import {getDatabase, ref as r, get, set} from 'firebase/database';
    import {storeData, getData} from '../../utils/LocalStorage';

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

    const SignIn = ({navigation, route}) => {

      const [selectedValue, setSelectedValue] = useState('Student');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [tokenpn, setTokenpn] = useState('');

      const db = getDatabase();
      function postToken(uid) {
        const studentRef = r(db, `Student/${uid}/tokenpn`);
        set(studentRef,tokenpn)
          .then(() => {
            //console.log("Token updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating token: ", error);
          });
      }

      const Login = async () => {
        const emails = `${email}${selectedValue === 'monitor' ? '@monitor.unklab.ac.id' : '@student.unklab.ac.id'}`;
        if (!email || !password) {
          // Show error message to the user
          alert('Please enter your email and password');
          return;
        }
        signInWithEmailAndPassword(authentication, emails, password)
          .then(async re => {
            console.log(re);
            const uid = re.user.uid;
            const email = re.user.email;
            const userType = await checkUserType(uid);
            storeData('userSession', {uid, email, password, userType});

            if (userType && userType.toLowerCase() === selectedValue.toLowerCase()) {
              if(userType == 'Student'){
                postToken(uid)
              }
              // Show the success alert
              alert('You are now logged in');
              // Delay the navigation to the appropriate home screen
              setTimeout(() => {
                if (userType === 'Monitor') {
                  navigation.replace('HomeMonitor');
                } else if (userType === 'Student') {
                  navigation.replace('HomeStudent');
                }
              }, 2000); // Add a 2-second (2000 milliseconds) delay before navigating
            } else {
              Alert.alert('Error!', 'Invalid user type');
            }
          })
          .catch(error => {
            Alert.alert('Alert!', error.message);
            console.log('Error:', error.message);
          });
      };
    
      useEffect(() => {
        getData('tokenpn').then(data => {
          setTokenpn(data)
        });
      }, []);

      return (
        <View style={styles.main}>
          <Header
            navigation={navigation}
            SigninColor="#FFFF"
            SignupColor="#7BC9DE"
            SigninColorBack="#7BC9DE"
            SignupColorBack="#FFFF"
          />
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <Gap height={10} />
          <Label
            title="Login as"
            textSize={16}
            textFam="Poppins-Regular"
            tALight="left"
            mL={50}
          />
          <Gap height={8} />
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                style={[styles.picker, {flex: 1}]}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
                dropdownIconColor="#7BC9DE">
                <Picker.Item
                  label="Student"
                  value="Student"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label="Monitor"
                  value="monitor"
                  style={styles.pickerItem}
                />
              </Picker>
            </View>
          </View>
          <Gap height={12} />

          <CustomTextInput
            title="Email"
            textFill={
              selectedValue === 'monitor'
                ? '@monitor.unklab.ac.id'
                : '@student.unklab.ac.id'
            }
            placeholder="S11910102"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Gap height={12} />
          <TextInput
            style={{color: 'black'}}
            title="Password"
            placeholder="*******"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <Gap height={20} />
          <Button
            title="Login"
            color="#7BC9DE"
            textColor="white"
            onPress={Login}
          />
          <Gap height={8} />
          {/* <Label title="Forgot password?" tALight="center" jContent="center" /> */}
        </View>
      );
    };


    const styles = StyleSheet.create({
      main: {
        backgroundColor: 'white',
        flex: 1,
      },
      logo: {
        width: 150, 
        height: 150, 
        resizeMode: 'contain',
      },
      logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkmark: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 50,
        borderRadius: 20,
        marginRight: 10,
      },
      remember: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },

      pickerContainer: {
        paddingHorizontal: 10,
        marginHorizontal: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      },
      pickerWrapper: {
        flexDirection: 'row',
      },
      picker: {
        color: 'black',
      },
      pickerItem: {
        color: 'black', 
        backgroundColor: 'white',
      },
    });

    export default SignIn;
