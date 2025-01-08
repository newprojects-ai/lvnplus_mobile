import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
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

type PracticeMode = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string[];
  backgroundColor: string;
};

const PRACTICE_MODES: PracticeMode[] = [
  {
    id: 'topic',
    title: 'Topic Wise',
    description: 'Master one concept at a time',
    icon: 'book-open-variant',
    gradient: ['#6366F1', '#4F46E5'],
    backgroundColor: '#EEF2FF',
  },
  {
    id: 'mental',
    title: 'Mental Math',
    description: 'Improve calculation speed',
    icon: 'brain',
    gradient: ['#10B981', '#059669'],
    backgroundColor: '#ECFDF5',
  },
  {
    id: 'mixed',
    title: 'Mixed Practice',
    description: 'Challenge all topics',
    icon: 'puzzle',
    gradient: ['#EC4899', '#DB2777'],
    backgroundColor: '#FCE7F3',
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const TestTypeSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {width} = useWindowDimensions();
  const [selectedMode, setSelectedMode] = React.useState<string | null>(null);
  const cardScale = useSharedValue(1);

  const handleModeSelect = (mode: PracticeMode) => {
    setSelectedMode(mode.id);
    cardScale.value = withSequence(
      withSpring(0.95),
      withSpring(1),
    );
    
    setTimeout(() => {
      // Navigate to the appropriate screen based on mode
      navigation.navigate('TopicSelection', {
        mode: mode.id,
      });
      setSelectedMode(null);
    }, 200);
  };

  const getCardAnimatedStyle = (modeId: string) => useAnimatedStyle(() => ({
    transform: [
      {
        scale: selectedMode === modeId ? cardScale.value : 1,
      },
    ],
    opacity: withTiming(selectedMode === null || selectedMode === modeId ? 1 : 0.6),
  }));

  return (
    <LinearGradient
      colors={['#6366F1', '#4338CA']}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hi Student!</Text>
            <Text style={styles.subtitle}>Ready to practice?</Text>
          </View>

          {/* Progress Card */}
          <TouchableOpacity 
            style={styles.progressCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ContinueLearning')}>
            <View>
              <Text style={styles.progressTitle}>Continue Learning</Text>
              <Text style={styles.progressSubtitle}>You're making great progress!</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '40%' }]} />
              </View>
              <Text style={styles.progressText}>4/10 questions completed</Text>
            </View>
          </TouchableOpacity>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tests</Text>
            </View>
          </View>

          {/* Practice Modes */}
          <View style={styles.modesSection}>
            <Text style={styles.sectionTitle}>Choose Practice Mode</Text>
            {PRACTICE_MODES.map(mode => (
              <AnimatedTouchable
                key={mode.id}
                style={[
                  styles.modeCard,
                  { backgroundColor: mode.backgroundColor },
                  getCardAnimatedStyle(mode.id),
                ]}
                activeOpacity={0.9}
                onPress={() => handleModeSelect(mode)}>
                <View style={styles.modeIconContainer}>
                  <LinearGradient
                    colors={mode.gradient}
                    style={styles.modeIconGradient}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <Icon
                      name={mode.icon}
                      type="material-community"
                      size={24}
                      color="#fff"
                    />
                  </LinearGradient>
                </View>
                <View style={styles.modeContent}>
                  <Text style={styles.modeTitle}>{mode.title}</Text>
                  <Text style={styles.modeDescription}>{mode.description}</Text>
                </View>
                <Icon
                  name="chevron-right"
                  type="material-community"
                  size={24}
                  color="#6B7280"
                />
              </AnimatedTouchable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  modesSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modeIconContainer: {
    marginRight: 16,
  },
  modeIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeContent: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});
