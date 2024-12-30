import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../ui/Button';
import type {TimingType, TimeLimit} from '../../types/test';
import {TIME_LIMITS} from '../../types/test';

interface TimingPickerProps {
  timingType: TimingType;
  timeLimit?: TimeLimit;
  onChangeType: (type: TimingType) => void;
  onChangeLimit: (limit: TimeLimit) => void;
}

export const TimingPicker: React.FC<TimingPickerProps> = ({
  timingType,
  timeLimit,
  onChangeType,
  onChangeLimit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.typeButtons}>
        <Button
          title="Timed"
          variant={timingType === 'TIMED' ? 'primary' : 'secondary'}
          onPress={() => onChangeType('TIMED')}
          style={styles.typeButton}
        />
        <Button
          title="Untimed"
          variant={timingType === 'UNTIMED' ? 'primary' : 'secondary'}
          onPress={() => onChangeType('UNTIMED')}
          style={styles.typeButton}
        />
      </View>

      {timingType === 'TIMED' && (
        <View style={styles.limitContainer}>
          <Text style={styles.label}>Time Limit (minutes)</Text>
          <View style={styles.limitButtons}>
            {TIME_LIMITS.map(limit => (
              <Button
                key={limit}
                title={limit.toString()}
                variant={timeLimit === limit ? 'primary' : 'secondary'}
                onPress={() => onChangeLimit(limit)}
                style={styles.limitButton}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
  },
  limitContainer: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  limitButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  limitButton: {
    minWidth: 80,
  },
});