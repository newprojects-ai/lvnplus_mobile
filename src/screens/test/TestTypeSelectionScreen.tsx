import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TestTypeSelection'>;
type RoutePropType = RouteProp<TestStackParamList, 'TestTypeSelection'>;

type TestType = {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string[];
  duration: string;
  questionCount: number;
};

const TEST_TYPES: TestType[] = [
  {
    id: '1',
    name: 'Quick Practice',
    description: 'Short, focused practice sessions to reinforce specific concepts',
    features: [
      'Adaptive difficulty',
      'Instant feedback',
      'Performance tracking',
      'Flexible timing',
    ],
    icon: 'lightning-bolt',
    gradient: ['#4c6ef5', '#364fc7'],
    duration: '15-20 min',
    questionCount: 15,
  },
  {
    id: '2',
    name: 'Full Test',
    description: 'Comprehensive assessment covering multiple topics',
    features: [
      'Exam-like environment',
      'Detailed analytics',
      'Progress tracking',
      'Topic breakdown',
    ],
    icon: 'book-open-page-variant',
    gradient: ['#f03e3e', '#c92a2a'],
    duration: '45-60 min',
    questionCount: 45,
  },
  {
    id: '3',
    name: 'Challenge Mode',
    description: 'Test your limits with advanced questions and time pressure',
    features: [
      'Time constraints',
      'Advanced questions',
      'Competitive scoring',
      'Achievement badges',
    ],
    icon: 'trophy',
    gradient: ['#40c057', '#2b8a3e'],
    duration: '30-40 min',
    questionCount: 30,
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const TestTypeSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const {width} = useWindowDimensions();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const cardScale = useSharedValue(1);

  const handleTestTypeSelect = (testType: TestType) => {
    setSelectedType(testType.id);
    cardScale.value = withSequence(
      withSpring(0.95),
      withSpring(1),
    );
    
    setTimeout(() => {
      navigation.navigate('TopicSelection', {
        subjectId: route.params.subjectId,
        subjectName: route.params.subjectName,
        testType: testType.id,
      });
      setSelectedType(null);
    }, 200);
  };

  const getCardAnimatedStyle = (typeId: string) => useAnimatedStyle(() => ({
    transform: [
      {
        scale: selectedType === typeId ? cardScale.value : 1,
      },
    ],
    opacity: withTiming(selectedType === null || selectedType === typeId ? 1 : 0.6),
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="material-community"
            size={28}
            color="#212529"
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.subjectName}>{route.params.subjectName}</Text>
          <Text style={styles.title}>Select Test Type</Text>
          <Text style={styles.subtitle}>Choose how you want to practice</Text>
        </View>
      </View>

      {/* Test Types List */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingHorizontal: width > 500 ? 32 : 16},
        ]}
        showsVerticalScrollIndicator={false}>
        {TEST_TYPES.map(testType => (
          <AnimatedTouchable
            key={testType.id}
            style={[styles.testCard, getCardAnimatedStyle(testType.id)]}
            activeOpacity={0.95}
            onPress={() => handleTestTypeSelect(testType)}>
            <LinearGradient
              colors={testType.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.cardGradient}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={testType.icon}
                      type="material-community"
                      size={28}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.testInfo}>
                    <View style={styles.infoItem}>
                      <Icon
                        name="clock-outline"
                        type="material-community"
                        size={16}
                        color="rgba(255, 255, 255, 0.9)"
                      />
                      <Text style={styles.infoText}>{testType.duration}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Icon
                        name="help-circle-outline"
                        type="material-community"
                        size={16}
                        color="rgba(255, 255, 255, 0.9)"
                      />
                      <Text style={styles.infoText}>
                        {testType.questionCount} questions
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.testName}>{testType.name}</Text>
                  <Text style={styles.testDescription}>
                    {testType.description}
                  </Text>
                </View>

                <View style={styles.featureList}>
                  {testType.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Icon
                        name="check-circle"
                        type="material-community"
                        size={16}
                        color="rgba(255, 255, 255, 0.9)"
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.startButton}>
                    <Text style={styles.startText}>Start {testType.name}</Text>
                    <Icon
                      name="chevron-right"
                      type="material-community"
                      size={20}
                      color="#fff"
                    />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </AnimatedTouchable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTextContainer: {
    gap: 4,
  },
  subjectName: {
    fontSize: 16,
    color: '#4c6ef5',
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#868e96',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  scrollContent: {
    paddingVertical: 24,
    gap: 16,
  },
  testCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardGradient: {
    padding: 24,
  },
  cardContent: {
    gap: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  testInfo: {
    gap: 8,
    alignItems: 'flex-end',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardBody: {
    gap: 8,
  },
  testName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  testDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: -0.3,
  },
  cardFooter: {
    marginTop: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  startText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.3,
  },
});
