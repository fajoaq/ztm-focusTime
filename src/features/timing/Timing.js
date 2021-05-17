import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ changeTime }) => {
  return (
    <>
      <RoundedButton 
        title="10"
        size={75}
        onPress={ () => changeTime(10) }
      />

      <RoundedButton 
        title="15"
        size={75}
        onPress={ () => changeTime(15) }
      />

      <RoundedButton 
        title="20"
        size={75}
        onPress={ () => changeTime(20) }
      />
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    flexDirection: 'row'
  }
})