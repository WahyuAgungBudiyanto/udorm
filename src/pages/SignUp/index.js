import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SignUp = ({navigation}) => {
  const btnSignIn = () => {
    navigation.push('SignIn');
  };
  
  return (
    <View>
      <Text>You are in Sign Up Page</Text>
      <View style={styles.btnSign}>
        <Button title="Sign In" onPress={() => btnSignIn()} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  btnSign: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
