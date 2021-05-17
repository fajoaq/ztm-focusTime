import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null)

  return (
    <View style={styles.container}>
      <View style={ styles.innerContainer }>
        <Text style={ styles.title }>What would you like to focus on?</Text>
        <View style={ styles.inputContainer }>
          <TextInput 
            style={ styles.input }
            onChangeText={ (text) => setSubject(text) }
          />
          <RoundedButton 
            title="+"  
            size={50}
            onPress={ () => addSubject(subject) }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
