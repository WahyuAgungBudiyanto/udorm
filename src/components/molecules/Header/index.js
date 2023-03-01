import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {IconBack} from '../../../assets/';
import {Gap} from './src/components/molecules';

const Header = ({text, onPress, btnSignIn, btnSignUp}) => {
  return (
    <View style={styles.container}>
      {/*Icon Back*/}
      <View style={styles.iconBack}>
        <TouchableOpacity activeAOpacity={0.7} onPress={onPress}>
          {/*<IconBack />*/}
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
            <Text style={{color: '#FFFF', fontWeight: 'bold', fontSize: 17}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.buttonWrapper,
            {height: 50, backgroundColor: 'white'},
          ]}>
          <TouchableOpacity onPress={() => btnSignUp()}>
            <Text style={{color: '#7BC9DE', fontWeight: 'bold', fontSize: 17}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 120,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
