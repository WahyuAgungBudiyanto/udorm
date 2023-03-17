import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {React, useState} from 'react';
import {Header, Button, Gap, Label, TextInput, CustomTextInput} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logo} from '../../assets/images';
import { Eye } from '../../assets/icons';
import {Picker} from '@react-native-picker/picker';
import authentication from '../../config/firebase-config'
import {signInWithEmailAndPassword} from 'firebase/auth';

const SignIn = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {
  const emails = `${email}@student.unklab.ac.id`;
  signInWithEmailAndPassword(authentication, emails, password)
    .then(re => {
      console.log(re);
      setIsSignedIn(true);
      Alert.alert('Success!', 'You are now logged in');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000); // Add a 2-second (2000 milliseconds) delay before navigating
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.log('User not found.');
        Alert.alert('Alert!', 'User not found');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Incorrect password.');
        Alert.alert('Alert!', 'Incorrect Password');
      }else if (error.code === 'auth/invalid-email') {
        console.log('Please fill it');
        Alert.alert('Alert!', 'Email or Password is empty');
      }else if (error.code === 'auth/internal-error') {
        console.log('Please fill it');
        Alert.alert('Alert!', 'Email or Password is empty');
      } else {
        console.log('Error:', error.message);
      }
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


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
              label="Monitor"
              value="monitor"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Mahasiswa"
              value="mahasiswa"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </View>
      <Gap height={12} />

      <CustomTextInput
        title="Email"
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
        title="             Login"
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
    color: 'black',
  },
  pickerItem: {
    color: 'white',
  },
});

export default SignIn;
