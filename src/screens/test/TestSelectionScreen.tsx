import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import {TestType} from '../../types/test';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestSelection'>;

type TestOption = {
  type: TestType;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const TEST_OPTIONS: TestOption[] = [
  {
    type: 'TOPIC',
    title: 'Topic Wise Test',
    description: 'Practice questions from specific topics to master individual concepts',
    icon: 'book-open-variant',
    color: '#339af0',
  },
  {
    type: 'MIXED',
    title: 'Mixed Test',
    description: 'Challenge yourself with questions from multiple topics',
    icon: 'puzzle',
    color: '#37b24d',
  },
  {
    type: 'MENTAL_ARITHMETIC',
    title: 'Mental Arithmetic',
    description: 'Improve your mental math skills with quick calculations',
    icon: 'calculator',
    color: '#f59f00',
  },
];

export const TestSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleTestSelect = (testType: TestType) => {
    navigation.navigate('ConfigureTest', {
      testType,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select Test Type</Text>
        <Text style={styles.subtitle}>
          Choose the type of test you want to take
        </Text>

        <View style={styles.optionsContainer}>
          {TEST_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.type}
              style={styles.optionCard}
              onPress={() => handleTestSelect(option.type)}>
              <View
                style={[styles.iconContainer, {backgroundColor: option.color}]}>
                <Icon
                  name={option.icon}
                  type="material-community"
                  color="#fff"
                  size={32}
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </View>
              <Icon
                name="chevron-right"
                type="material-community"
                color="#adb5bd"
                size={24}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#868e96',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
