import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import {Logo} from '../../assets/images';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import {Header, Button, TextInput, Gap, Label, CustomTextInput} from '../../components';
import authentication,{db} from '../../config/firebase-config'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref as r, getDatabase, child, get, update} from 'firebase/database';
import {storeData} from '../../utils/LocalStorage';

const SignUp = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Crystal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FullName, setFullName] = useState('');
  const [NumberParent, setNumberParent] = useState('');
  const [Gender, setGender] = useState('Male');
  const [Faculty, setFaculty] = useState('Ilmu Komputer');


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
          points: 0,
          tokenpn: ''
        });
        const data = {
          uid: re.user.uid,
        };
        storeData('user', data);
        Alert.alert('Success!', 'You are now registered');
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 2000); // Add a 2-second (2000 milliseconds) delay before navigating
      })
      .catch(error => {
        Alert.alert('Alert!', error.message);
        console.log('Error:', error.message);
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
      <Label
        title="Gender"
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
            selectedValue={Gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            dropdownIconColor="#7BC9DE">
            <Picker.Item label="Male" value="Male" style={styles.pickerItem} />
            <Picker.Item label="Female" value="Female" style={styles.pickerItem} />
          </Picker>
        </View>
      </View>
      <Gap height={12} />
      <Label
        title="Faculty"
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
            selectedValue={Faculty}
            onValueChange={(itemValue, itemIndex) => setFaculty(itemValue)}
            dropdownIconColor="#7BC9DE">
            <Picker.Item
              label="Ilmu Komputer"
              value="Ilmu Komputer"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Fakultas Filsafat"
              value="Fakultas Filsafat"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Fakultas Keguruan dan Ilmu Pendidikan"
              value="Fakultas Keguruan dan Ilmu Pendidikan"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Fakultas Ekonomi dan Bisnis"
              value="Fakultas Ekonomi dan Bisnis"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Fakultas Pertanian"
              value="Fakultas Pertanian"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Fakultas Keperawatan"
              value="Fakultas Keperawatan"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Akademi Sekretari Manajemen Indonesia Klabat"
              value="Akademi Sekretari Manajemen Indonesia Klabat"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </View>

      <Gap height={20} />

      <Button
        title="Register"
        color="#7BC9DE"
        textColor="white"
        onPress={Register}
      />

      <Gap height={50} />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    paddingHorizontal: 0.1,
    marginHorizontal: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    color: 'black', 
  },
  pickerItem: {
    color: 'black',
    backgroundColor: 'white', 
  },
});
