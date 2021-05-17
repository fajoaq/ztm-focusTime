import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { FocusHistory } from './src/features/focusHistory/FocusHistory';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors'
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory + 1), subject, status }
    ]);
  };

  const onTimerEnd = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  };

  const clearSubject = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELED);
    setFocusSubject(null);
  };

  const clearHistory = () => {
    setFocusHistory([]);
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch(e) {
      console.log(e)
    }
  }

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      { focusSubject ? 
        <Timer 
          focusSubject={ focusSubject }
          onTimerEnd={ onTimerEnd }
          clearSubject={ clearSubject }
        />
        : 
        <View style={ styles.focus }>
          <Focus addSubject={ setFocusSubject }/>
          <FocusHistory focusHistory={ focusHistory } onClear={ clearHistory } />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform === 'ios' ? spacing.xl : spacing.lg,
    backgroundColor: colors.blue
  },
  focus: {
    flex: 1
  }
});
