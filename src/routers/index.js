import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp, HomeStudent, HomeMonitor} from '../pages';
import {MainLoc} from '../pages/Maps';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainLoc" component={MainLoc} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeStudent" component={HomeStudent} />
      <Stack.Screen name="HomeMonitor" component={HomeMonitor} />
    </Stack.Navigator>
  );
}
