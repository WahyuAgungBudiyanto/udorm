import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {React, useState} from 'react';
import {Header, Button, Gap, Label, TextInput, CustomTextInput} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logo} from '../../assets/images';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import authentication from '../../config/firebase-config'
import {signInWithEmailAndPassword} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import {getDatabase, ref as r, get} from 'firebase/database';

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

const SignIn = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Student');
  const [isChecked, setIsChecked] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleCheck = () => {setIsChecked(!isChecked);};

  const Login = async () => {
    const emails = `${email}${selectedValue === 'monitor' ? '@monitor.unklab.ac.id' : '@student.unklab.ac.id'}`;
    
    auth().signInWithEmailAndPassword(emails, password)
      .then(async re => {
        console.log(re);
        const uid = re.user.uid;
        const userType = await checkUserType(uid);

        if (userType && userType.toLowerCase() === selectedValue.toLowerCase()) {
          setIsSignedIn(true);

          // Show the success alert
          Alert.alert('Success!', 'You are now logged in');

          // Delay the navigation to the appropriate home screen
          setTimeout(() => {
            if (userType === 'Monitor') {
              navigation.navigate('HomeMonitor');
            } else if (userType === 'Student') {
              navigation.navigate('HomeStudent');
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
      <Gap height={1} />
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

      <Gap height={12} />
      <View style={styles.remember}>
        <TouchableOpacity
          onPress={handleCheck}
          style={[
            styles.checkmark,
            isChecked && {backgroundColor: '#13FF0E', borderColor: '#13FF0E'},
          ]}>
          {isChecked && <Icon name="check" size={20} color="white" />}
        </TouchableOpacity>
        <Label title="Remember Me" textColor="#585757" />
      </View>
      <Gap height={12} />
      <Button
        title="Login"
        color="#7BC9DE"
        textColor="white"
        onPress={Login}
      />
      <Gap height={8} />
      <Label title="Forgot password?" tALight="center" jContent="center" />
      <Gap height={300} />
    </View>
  );
};


const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain', // To maintain the aspect ratio
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
    color: 'black', // set text color to black
  },
  pickerItem: {
    color: 'black', // set dropdown item text color to black
    backgroundColor: 'white', // set dropdown item background color to white
  },
});

export default SignIn;
