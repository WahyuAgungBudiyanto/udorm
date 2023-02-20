import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {PermissionsAndroid} from 'react-native';

const Background = () => {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
        error => {
          console.log(error.code, error.message);
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('success');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Button
        title="Enable Location Permission"
        onPress={requestLocationPermission}
      />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
