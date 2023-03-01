import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, Button, TextInput, Gap} from '../../components';

const SignIn = ({navigation, title, placeholder}) => {
  const btnSignIn = () => {
    navigation.push('SignUp');
  };

  return (
    <View style={styles.main}>
      <Header />
      <Text style={{color: 'black', marginTop: 30}}>LOGO</Text>
      <Gap height={100} />
      <TextInput title="Login As" placeholder="Type your email address" />
      <TextInput title="Email" placeholder="S11910102" />
      <TextInput title="Password" placeholder="*******" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
});
