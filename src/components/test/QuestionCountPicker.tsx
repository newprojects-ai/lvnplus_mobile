import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

interface QuestionCountPickerProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (count: number) => void;
}

export const QuestionCountPicker: React.FC<QuestionCountPickerProps> = ({
  value,
  min = 5,
  max = 50,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Questions: {value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={5}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#e0e0e0"
      />
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>{min}</Text>
        <Text style={styles.rangeText}>{max}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  slider: {
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 12,
    color: '#666',
  },
});