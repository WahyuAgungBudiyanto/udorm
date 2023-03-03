import {StyleSheet, View, TouchableOpacity,Text} from 'react-native';
import {React, useState} from 'react';
import {Header, Button, TextInput, Gap, Label} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const SignIn = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
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
      <Gap height={87} />
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
      
      <TextInput title="Email" placeholder="S11910102" />
      {/* <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4}}>
          <TextInput title="Email" placeholder="S11910102" />
        </View>
        <View style={{flex: 5}}>
          <TextInput placeholder="@student.unklab.ac.id" />
        </View>
      </View> */}
      <Gap height={12} />
      <TextInput title="Password" placeholder="*******" />
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
        onPress={() => navigation.navigate('SignUp')}
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
