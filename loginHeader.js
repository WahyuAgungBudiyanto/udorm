import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {Logo} from './src/assets/icons';
import {Gap} from './src/components/molecules';

const loginHeader = ({text, onPress, btnSignIn, btnSignUp}) => {
  return (
    <View style={styles.container}>
      {/*Icon Back*/}
      <View style={styles.iconBack}>
        <TouchableOpacity activeAOpacity={0.7} onPress={onPress}>
          
        </TouchableOpacity>
      </View>
      {/*Logo dan Teks*/}
      <View style={styles.logoWrapper}>
        <View
          style={[
            styles.buttonWrapper,
            {height: 50, backgroundColor: '#7BC9DE'},
          ]}>
          <TouchableOpacity onPress={() => btnSignIn()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.buttonWrapper,
            {height: 50, backgroundColor: 'white'},
          ]}>
          <TouchableOpacity onPress={() => btnSignUp()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default loginHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 120,
    backgroundColor: '#D3D3D3',
  },
  iconBack: {
    marginLeft: 29,
    marginTop: 30,
  },
  logoWrapper: {
    flexDirection: 'row', // align children horizontally
  },
  buttonWrapper: {
    width: 140,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white', // or any other color you want
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
  },
});
