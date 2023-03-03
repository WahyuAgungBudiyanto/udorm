import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';

const SignUp = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
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

      <Gap height={87} />

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
            <Picker.Item label="Crystal" value="1" style={styles.pickerItem} />
            <Picker.Item label="Edel" value="2" style={styles.pickerItem} />
            <Picker.Item label="Genset" value="3" style={styles.pickerItem} />
            <Picker.Item label="Guest" value="4" style={styles.pickerItem} />
            <Picker.Item label="Jasmine" value="5" style={styles.pickerItem} />
            <Picker.Item label="Annex" value="6" style={styles.pickerItem} />
          </Picker>
        </View>
      </View>
      <Gap height={12} />
      <TextInput title="Full Name" placeholder="Wahyu Agung" />
      <Gap height={12} />
      <TextInput title="Email" placeholder="S11910102" />
      <Gap height={12} />
      <TextInput title="Password" placeholder="*******" />
      <Gap height={12} />
      <TextInput
        title="Parent / Guardian Whatsapp Number"
        placeholder="6288888888"
      />
      <Gap height={12} />
      <TextInput title="Gender" placeholder="Male/Female" />
      <Gap height={12} />
      <TextInput title="Faculty" placeholder="Ilmu Komputer" />
      <Gap height={20} />

      <Button
        title="             Register"
        color="#7BC9DE"
        textColor="white"
        onPress={() => navigation.navigate('Home')}
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
