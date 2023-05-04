import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import React from 'react';

const TextInput = ({title, placeholder, onChangeText, value, keyboardType, secureTextEntry}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#CCC6C6"
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: '#020202',
    marginHorizontal: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    color: '#000',
    borderRadius: 8,
    paddingLeft: 19,
    marginHorizontal: 50,
  },
});
