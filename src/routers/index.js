import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp, HomeStudent, HomeMonitor, SplashScreen} from '../pages';
import {MainLoc} from '../pages/Maps';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase, ref as r, get} from 'firebase/database';
import {storeData, getData} from '../utils/LocalStorage';

const Stack = createNativeStackNavigator();

const checkUserType = async uid => {
  const db = getDatabase();

  // Check if the user exists in the Monitor section
  const monitorRef = r(db, `Monitor/${uid}`);
  const monitorSnapshot = await get(monitorRef);
  if (monitorSnapshot.exists()) {
    return 'Monitor';
  }

  // Check if the user exists in the Student section
  const studentRef = r(db, `Student/${uid}`);
  const studentSnapshot = await get(studentRef);
  if (studentSnapshot.exists()) {
    return 'Student';
  }

  return null;
};

const Router = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userType = await checkUserType(user.uid);

        if (userType) {
          setUser({
            uid: user.uid,
            email: user.email,
            userType: userType,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // 5 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      {user?.userType === 'Student' && (
        <>
          <Stack.Screen name="HomeStudent" component={HomeStudent} />
          <Stack.Screen name="MainLoc" component={MainLoc} />
        </>
      )}
      {user?.userType === 'Monitor' && (
        <>
          <Stack.Screen name="HomeMonitor" component={HomeMonitor} />
          <Stack.Screen name="MainLoc" component={MainLoc} />
        </>
      )}
      {!user && (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
