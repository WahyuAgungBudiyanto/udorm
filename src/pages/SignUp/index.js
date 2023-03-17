import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logo} from '../../assets/images';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label, CustomTextInput} from '../../components';

import authentication,{db} from '../../config/firebase-config'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref as r, getDatabase, child, get, update} from 'firebase/database';
import {storeData} from '../../utils/LocalStorage';

const SignUp = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState('Crystal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FullName, setFullName] = useState('');
  const [NumberParent, setNumberParent] = useState('');
  const [Gender, setGender] = useState('');
  const [Faculty, setFaculty] = useState('');

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const Register = () => {
    const noRegis = email.split('@')[0];
    //console.log('Selected Value: ', selectedValue);
    const emails = `${email}@student.unklab.ac.id`;
    //console.log(emails)
    
    createUserWithEmailAndPassword(authentication, emails, password)
      .then(re => {
        console.log(re);
        update(r(db, `Student/${authentication.currentUser.uid}`), {
          StudentType: selectedValue,
          Email: emails,
          Name: FullName,
          Parent: NumberParent,
          Gender: Gender,
          Faculty: Faculty,
          Location: '',
        });
        const data = {
          uid: re.user.uid,
        };
        storeData('user', data);
        Alert.alert('Success!', 'You are now registered');
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 1000); // Add a 2-second (2000 milliseconds) delay before navigating
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('Error:', error.message);
          Alert.alert('Alert!', 'Email is not valid');
        } else if (error.code === 'auth/missing-email') {
          console.log('Error:', error.message);
          Alert.alert('Alert!', 'Email is empty');
        } else if (error.code === 'auth/weak-password') {
          console.log('Error:', error.message);
          Alert.alert('Alert!', 'Password should be at least 6 characters');
        } else if (error.code === 'auth/email-already-in-use') {
          console.log('Error:', error.message);
          Alert.alert('Alert!', 'Email is already used, pick another one');
        } else if (error.code === 'auth/network-request-failed') {
          console.log('Error:', error.message);
          Alert.alert(
            'Alert!',
            'Network error, please check your internet connection',
          );
        } else if (error.code === 'auth/internal-error') {
          console.log('Error:', error.message);
          Alert.alert('Alert!', 'Email or Password is empty');
        } else {
          console.log('Error:', error.message);
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        navigation={navigation}
        SigninColor="#7BC9DE"
        SignupColor="#FFFF"
        SigninColorBack="#FFFF"
        SignupColorBack="#7BC9DE"
      />
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Gap height={1} />

      <Label
        title="Register as"
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
              label="Student Crystal"
              value="Crystal"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Student Edel"
              value="Edel"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Student Genset"
              value="Genset"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Student Guest"
              value="Guest"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Student Jasmine"
              value="Jasmine"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Student Annex"
              value="Annex"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </View>
      <Gap height={12} />
      <TextInput
        title="Full Name"
        placeholder="Wahyu Agung"
        value={FullName}
        onChangeText={text => setFullName(text)}
      />
      <Gap height={12} />
      <CustomTextInput
        title="Email"
        textFill="@student.unklab.ac.id"
        placeholder="S11910102"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Gap height={12} />
      <TextInput
        title="Password"
        placeholder="*******"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Gap height={12} />
      <TextInput
        title="Parent / Guardian Whatsapp Number"
        placeholder="6288888888"
        value={NumberParent}
        onChangeText={text => setNumberParent(text)}
      />
      <Gap height={12} />
      <TextInput
        title="Gender"
        placeholder="Male/Female"
        value={Gender}
        onChangeText={text => setGender(text)}
      />
      <Gap height={12} />
      <TextInput
        title="Faculty"
        placeholder="Ilmu Komputer"
        value={Faculty}
        onChangeText={text => setFaculty(text)}
      />
      <Gap height={20} />

      <Button
        title="             Register"
        color="#7BC9DE"
        textColor="white"
        onPress={Register}
      />

      <Gap height={20} />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 0.1,
    marginHorizontal: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    color: 'black',
  },
  pickerItem: {
    color: 'white',
  },
});
