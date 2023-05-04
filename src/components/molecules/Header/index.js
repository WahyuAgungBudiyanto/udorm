import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';


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
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <View style={styles.btnSigninBack(SigninColorBack)}>
            <Text style={styles.btnSignin(SigninColor)}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View style={styles.btnSignupBack(SignupColorBack)}>
            <Text style={styles.btnSignup(SignupColor)}>Sign Up</Text>
          </View>
        </TouchableOpacity>
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
