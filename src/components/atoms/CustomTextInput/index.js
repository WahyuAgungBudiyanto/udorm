import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
const Eye = require('../../../assets/icons/eye.svg');

const CustomTextInput = ({title, placeholder, value, onChangeText,textFill}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#CCC6C6"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.emailSuffix}>{textFill}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: '#020202',
    marginHorizontal: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 13,
  },
  textInput: {
    flex: 1,
    color: 'black',
  },
  emailSuffix: {
    color: '#A5A1A1',
    backgroundColor: '#D3D3D3',
    marginVertical: 5,
    marginRight: 2,
    paddingRight: 8, // Increase the padding
    paddingLeft: 8, // Increase the padding
    borderTopRightRadius: 12, // Increase the border radius
    borderBottomRightRadius: 12, // Increase the border radius
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    lineHeight: 15,
    textAlignVertical: 'center',
  },
});


export default CustomTextInput;
