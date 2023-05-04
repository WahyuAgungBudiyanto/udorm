import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Label = ({
  title,
  textFam = 'Poppins-Medium',
  textSize = 14,
  textColor = '#000000',
  tALight,
  jContent,
  mL,
  mT,
  mB
}) => {
  return (
    <Text
      style={styles.txt(
        textFam,
        textSize,
        textColor,
        tALight,
        jContent,
        mL,
        mT,
        mB
      )}>
      {title}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  txt: (textFam, textSize, textColor, tALight, jContent, mL, mT, mB) => ({
    fontFamily: textFam,
    fontSize: textSize,
    color: textColor,
    marginLeft: mL,
    marginTop: mT,
    marginBottom: mB,
    textAlign: tALight,
    justifyContent: jContent,
  }),
});
