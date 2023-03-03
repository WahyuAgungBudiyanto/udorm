import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp, Home} from '../pages';
import {MainLoc} from '../pages/Maps';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainLoc" component={MainLoc} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
