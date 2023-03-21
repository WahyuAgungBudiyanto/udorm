import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import {Label} from '../../components'
import {Logo} from '../../assets/images';

const SplashScreen = () => {
  return (
    <View style={styles.main}>
      <Text>SplashScreen</Text>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={{color:'black', left: 125, bottom: 90, fontSize: 20, color:'#7BC9DE', fontFamily: 'Poppins-Medium'}}>Unklab Dormitory</Text>
        {/* <Label title="HomeMonitor" color='#7BC9DE'></Label> */}
      </View>
    </View>
  );
}

export default SplashScreen

const styles = StyleSheet.create({
  main: {
    flex: 1, // Set the main container to take up the entire screen
    backgroundColor: 'white',
    alignItems: 'center', // Center the logo horizontally
  },
  logo: {
    width: 270, // Adjust the width as needed
    height: 270, // Adjust the height as needed
    resizeMode: 'contain', // To maintain the aspect ratio
  },
  logoContainer: {
    marginVertical: 200
  },
});