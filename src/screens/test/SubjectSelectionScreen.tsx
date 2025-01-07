import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import {useAppSelector} from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'SubjectSelection'>;

type Subject = {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string[];
  questionCount: number;
  completedCount: number;
  accuracy: number;
};

const SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    icon: 'calculator',
    description: 'Master core concepts from arithmetic to calculus',
    gradient: ['#4c6ef5', '#364fc7'],
    questionCount: 500,
    completedCount: 250,
    accuracy: 85,
  },
  {
    id: '2',
    name: 'Physics',
    icon: 'atom',
    description: 'Explore mechanics, waves, and modern physics',
    gradient: ['#f03e3e', '#c92a2a'],
    questionCount: 300,
    completedCount: 150,
    accuracy: 78,
  },
  {
    id: '3',
    name: 'Chemistry',
    icon: 'flask',
    description: 'Study matter, reactions, and chemical bonds',
    gradient: ['#40c057', '#2b8a3e'],
    questionCount: 400,
    completedCount: 200,
    accuracy: 92,
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const SubjectSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {width} = useWindowDimensions();
  const {loading} = useAppSelector(state => state.test);
  const cardScale = useSharedValue(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Create individual animated styles for each subject
  const subjectAnimatedStyles = SUBJECTS.map(subject => {
    return useAnimatedStyle(() => ({
      transform: [
        {
          scale: selectedSubject === subject.id ? cardScale.value : 1,
        },
      ],
      opacity: withTiming(selectedSubject === null || selectedSubject === subject.id ? 1 : 0.6),
    }));
  });

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject.id);
    cardScale.value = withSequence(
      withSpring(0.95),
      withSpring(1),
    );
    
    setTimeout(() => {
      navigation.navigate('TestTypeSelection', {
        subjectId: subject.id,
        subjectName: subject.name,
      });
      setSelectedSubject(null);
    }, 200);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c6ef5" />
        <Text style={styles.loadingText}>Loading subjects...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.title}>Practice Tests</Text>
          <Text style={styles.subtitle}>Choose a subject to begin your learning journey</Text>
        </View>
        <TouchableOpacity 
          style={styles.helpButton}
          activeOpacity={0.7}
          onPress={() => {/* Show help modal */}}>
          <Icon
            name="help-circle-outline"
            type="material-community"
            size={24}
            color="#4c6ef5"
          />
        </TouchableOpacity>
      </View>

      {/* Subjects Grid */}
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          {paddingHorizontal: width > 500 ? 32 : 16},
        ]}
        showsVerticalScrollIndicator={false}>
        {SUBJECTS.map((subject, index) => (
          <AnimatedTouchable
            key={subject.id}
            style={[styles.subjectCard, subjectAnimatedStyles[index]]}
            activeOpacity={0.95}
            onPress={() => handleSubjectSelect(subject)}>
            <LinearGradient
              colors={subject.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.cardGradient}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={subject.icon}
                      type="material-community"
                      size={28}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Icon
                        name="check-circle-outline"
                        type="material-community"
                        size={16}
                        color="rgba(255, 255, 255, 0.9)"
                      />
                      <Text style={styles.statText}>
                        {subject.completedCount} completed
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon
                        name="chart-line"
                        type="material-community"
                        size={16}
                        color="rgba(255, 255, 255, 0.9)"
                      />
                      <Text style={styles.statText}>
                        {subject.accuracy}% accuracy
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.cardBody}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectDescription}>
                    {subject.description}
                  </Text>
                </View>
                
                <View style={styles.cardFooter}>
                  <View style={styles.questionCount}>
                    <Text style={styles.questionCountText}>
                      {subject.questionCount}+ Questions
                    </Text>
                  </View>
                  <View style={styles.startButton}>
                    <Text style={styles.startText}>Start Practice</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  welcomeText: {
    fontSize: 16,
    color: '#4c6ef5',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#868e96',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#868e96',
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingVertical: 24,
    gap: 16,
  },
  subjectCard: {
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
  statsContainer: {
    gap: 8,
    alignItems: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardBody: {
    gap: 8,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subjectDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  questionCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  questionCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.3,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  startText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.3,
  },
});
