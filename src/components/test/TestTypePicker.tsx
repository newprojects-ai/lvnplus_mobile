import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../ui/Button';
import type {TestType} from '../../types/test';

interface TestTypePickerProps {
  value: TestType;
  onChange: (type: TestType) => void;
}

export const TestTypePicker: React.FC<TestTypePickerProps> = ({
  value,
  onChange,
}) => {
  const types: Array<{id: TestType; label: string}> = [
    {id: 'TOPIC', label: 'Subject Specific'},
    {id: 'MIXED', label: 'Multi Subject'},
    {id: 'MENTAL_ARITHMETIC', label: 'Mental Arithmetic'},
  ];

  return (
    <View style={styles.container}>
      {types.map(({id, label}) => (
        <Button
          key={id}
          title={label}
          variant={value === id ? 'primary' : 'secondary'}
          onPress={() => onChange(id)}
          style={styles.button}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    marginVertical: 4,
  },
});