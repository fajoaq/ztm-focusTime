import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';


const minutesToMilli = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes=10,
  isPaused,
  onProgress,
  onEnd
  }) => {

  const [millis, setMillis] = useState(minutesToMilli(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second= Math.floor(millis / 1000) % 60;
  const interval = useRef(null);

  const countDown = () => {
    if(!isPaused) {
      setMillis((time) => {
        const timeLeft = time - 1000;

        if(timeLeft === 0) {
          clearInterval(interval.current);

          return 0;
        }
        
        return timeLeft;
      });
    }
  };

  useEffect(() => {
    onProgress(millis / minutesToMilli(minutes));

    if(millis === 0) onEnd();
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMilli(minutes));
  }, [minutes])

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000); 

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>{formatTime(minute)}:{formatTime(second)}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.largest,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    textAlign: 'center',
    backgroundColor: 'rgba(94,132,226,0.3)'
  }
});