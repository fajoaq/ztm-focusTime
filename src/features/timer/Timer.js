import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { Timing } from '../timing/Timing';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;
  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 2s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 2s";

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    if(progress === 0) {
      onTimerEnd();
      return;
    }

    setProgress(progress);
  };

  const onChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const vibrate = () => {
    if(Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);

      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate([500, 2000, 500, 2000, 500]);
    }
  }

  return (
    <View style={ styles.container }>

      <View style={ styles.countdown}>
        <Countdown
          minutes={ minutes }
          isPaused={ !isStarted } 
          onProgress={ onProgress }
          onEnd={ () => onEnd() }
        />
      </View>

      <View style={ styles.header }>
        <Text style={ styles.title }>Focusing on:</Text>
        <Text style={ styles.subject }>{ focusSubject }</Text>
      </View>

      <View style={ styles.progressBar }>
        <ProgressBar
          progress={ progress }
          color='#5E84E2'
        />
      </View>

      <View style={ styles.buttonWrapper }>
        <Timing changeTime={ onChangeTime } />
      </View>

      <View style={ styles.buttonWrapper }>
        { isStarted ?
          <RoundedButton 
            title="pause" 
            onPress={ () => setIsStarted(false)}
          />
          :
          <RoundedButton 
            title="start" 
            onPress={ () => setIsStarted(true)}
          />
        }
      </View>

      <View style={ styles.clearSubject }>
        <RoundedButton 
          title="X"
          size= { 50 }
          onPress={ () => clearSubject() }
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.xxl
  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  subject: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  progressBar: {
    height: 10,
    paddingTop: spacing.sm
  },
  clearSubject: {
    paddingBottom: 20,
    paddingLeft: 25
  }
});