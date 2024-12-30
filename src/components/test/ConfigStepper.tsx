import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {TestConfigStep} from '../../types/test';

interface ConfigStepperProps {
  steps: TestConfigStep[];
  currentStep: number;
  onStepPress: (index: number) => void;
}

export const ConfigStepper: React.FC<ConfigStepperProps> = ({
  steps,
  currentStep,
  onStepPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = step.completed;

        return (
          <React.Fragment key={step.key}>
            {index > 0 && <View style={styles.connector} />}
            <View
              style={[
                styles.step,
                isActive && styles.activeStep,
                isCompleted && styles.completedStep,
              ]}>
              <Text
                style={[
                  styles.stepNumber,
                  isActive && styles.activeStepNumber,
                  isCompleted && styles.completedStepNumber,
                ]}
                onPress={() => isCompleted ? onStepPress(index) : null}>
                {index + 1}
              </Text>
              <Text
                style={[
                  styles.stepTitle,
                  isActive && styles.activeStepTitle,
                  isCompleted && styles.completedStepTitle,
                ]}>
                {step.title}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  step: {
    alignItems: 'center',
    gap: 4,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    color: '#666',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
  activeStep: {
    transform: [{scale: 1.1}],
  },
  activeStepNumber: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  completedStep: {},
  completedStepNumber: {
    backgroundColor: '#34C759',
    color: '#fff',
  },
  stepTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  activeStepTitle: {
    color: '#007AFF',
    fontWeight: '500',
  },
  completedStepTitle: {
    color: '#34C759',
  },
  connector: {
    width: 40,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: -12,
  },
});