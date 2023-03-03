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
      )}>
      {title}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  txt: (textFam, textSize, textColor, tALight, jContent, mL, mT) => ({
    fontFamily: textFam,
    fontSize: textSize,
    color: textColor,
    marginLeft: mL,
    marginTop: mT,
    textAlign: tALight,
    justifyContent: jContent,
  }),
});
