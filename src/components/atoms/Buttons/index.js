import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  title,
  color = '#02CF8E',
  textColor = '#020202',
  mL,
  mT,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color, pdL, pH, mH) => ({
    height: 45,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingHorizontal: 50,
    marginHorizontal: 50,
    borderRadius: 10,
  }),
  text: textColor => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: textColor,
  }),
});
