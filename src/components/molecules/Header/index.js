import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {IconBack, Exit} from '../../../assets';
import {Gap} from './src/components/molecules';

const Header = ({onPress, navigation, SigninColor, SignupColor, SigninColorBack, SignupColorBack}) => {
  return (
    <View style={styles.container}>
      {/*Icon Back*/}
      <View style={styles.iconBack}>
        <TouchableOpacity
          activeAOpacity={0.7}
          onPress={onPress}></TouchableOpacity>
      </View>
      {/*Logo dan Teks*/}
      <View style={styles.logoWrapper}>
        <View style={styles.btnSigninBack(SigninColorBack)}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.btnSignin(SigninColor)}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnSignupBack(SignupColorBack)}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.btnSignup(SignupColor)}>Sign Up</Text>
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
  btnSignin: SigninColor => ({
    color: SigninColor,
    fontWeight: 'bold',
    fontSize: 17,
  }),
  btnSignup: SignupColor => ({
    color: SignupColor,
    fontWeight: 'bold',
    fontSize: 17,
  }),
  btnSigninBack: SigninColorBack => ({
    backgroundColor: SigninColorBack,
    height: 50,
    width: 140,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  btnSignupBack: SignupColorBack => ({
    backgroundColor: SignupColorBack,
    height: 50,
    width: 140,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  iconBack: {
    marginLeft: 29,
    marginTop: 30,
  },
  logoWrapper: {
    flexDirection: 'row', // align children horizontally
  },
});
