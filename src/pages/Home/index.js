import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Header, Button, TextInput, Gap, Label} from '../../components';

const Home = ({navigation}) => {
  
  return (
    <ScrollView style={styles.container}>
      <Label title="HOME"></Label>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
  },
  
});
