import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useEffect} from 'react';
import {Label} from '../../components';
import {mainBackground} from '../../assets/images';
import {Logo} from '../../assets/icons';
import {getData} from '../../utils/LocalStorage';

const {width, height} = Dimensions.get('window');

const SplashScreen = props => {
  useEffect(() => {
    getData('tokenpn').then(data => {
      getData('userSession').then(dataSession => {
        if (dataSession) {
          setTimeout(() => {
            props.navigation.replace(
              dataSession.userType == 'Student' ? 'HomeStudent' : 'HomeMonitor',
            );
          }, 1500);
        } else if (dataSession == null) {
          setTimeout(() => {
            props.navigation.replace('SignIn', {tokenpn: data});
          }, 1500);
        }
      });
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.backgroundContainer}>
        <ImageBackground source={mainBackground} style={styles.background} />
      </View>
      <View style={styles.logoContainer}>
        <Logo width={500} height={160} />
        {/* <Image source={Logo} style={styles.logo} /> */}
        <Label
          title="Unklab Dormitory"
          textColor="#7BC9DE"
          textSize={width * 0.06}
          tALight="center"
          mL={width * 0.61 - 100}
          mB={height * 0.005}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'column',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.07,
  },
});
