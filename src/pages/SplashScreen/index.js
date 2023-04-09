import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {useEffect} from 'react';
import {Label} from '../../components';
import {Logo} from '../../assets/images';
import { getData } from '../../utils/LocalStorage';
const {width, height} = Dimensions.get('window');

const SplashScreen = (props) => {
  useEffect(() => {
   
    getData('tokenpn').then(data => {
        getData('userSession').then(dataSession => {
          if(dataSession){
            setTimeout(() => {
              props.navigation.replace( dataSession.userType == 'Student' ? 'HomeStudent' : 'HomeMonitor')
            }, 200)
          }
          else if (dataSession == null){
            setTimeout(() => {
              props.navigation.replace('SignIn',{tokenpn:data})
            }, 200)
          }
        });
    });

  }, [])
  

  return (
    <View style={styles.main}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Unklab Dormitory</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    top: height * 0.55,
    left: width * 0.36,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#7BC9DE',
  },
});