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
            }, 1000)
          }
          else if (dataSession == null){
            setTimeout(() => {
              props.navigation.replace('SignIn', {tokenpn: data});
            }, 1000);
          }
        });
    });

  }, [])
  

  return (
    <View style={styles.main}>
      <View style={styles.logoContainer}>
        <View style={styles.content}>
          <Image source={Logo} style={styles.logo} />
          <Label title="Unklab Dormitory" textColor="#7BC9DE" textSize={25} tALight="center" mL={(width * 0.6) - 100} mT={-(height * 0.03)} />
        </View>
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
  content: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: height * 0.03,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.2,
    resizeMode: 'contain',
  },
});
