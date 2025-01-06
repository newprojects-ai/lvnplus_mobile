import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TopicSelection'>;
type RoutePropType = RouteProp<TestStackParamList, 'TopicSelection'>;

type Topic = {
  id: string;
  name: string;
  questionCount: number;
  subtopics?: Topic[];
};

// Mock data - replace with API call
const TOPICS: Topic[] = [
  {
    id: '1',
    name: 'Algebra',
    questionCount: 150,
    subtopics: [
      {id: '1.1', name: 'Linear Equations', questionCount: 50},
      {id: '1.2', name: 'Quadratic Equations', questionCount: 50},
      {id: '1.3', name: 'Polynomials', questionCount: 50},
    ],
  },
  {
    id: '2',
    name: 'Geometry',
    questionCount: 120,
    subtopics: [
      {id: '2.1', name: 'Triangles', questionCount: 40},
      {id: '2.2', name: 'Circles', questionCount: 40},
      {id: '2.3', name: 'Polygons', questionCount: 40},
    ],
  },
  {
    id: '3',
    name: 'Trigonometry',
    questionCount: 90,
    subtopics: [
      {id: '3.1', name: 'Basic Ratios', questionCount: 30},
      {id: '3.2', name: 'Identities', questionCount: 30},
      {id: '3.3', name: 'Applications', questionCount: 30},
    ],
  },
];

export const TopicSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const {width} = useWindowDimensions();
  const {subjectId, subjectName} = route.params;
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopics(prev => {
      const topic = TOPICS.find(t => t.id === topicId);
      if (!topic) return prev;

      const subtopicIds = topic.subtopics?.map(st => st.id) || [];
      const isSelected = prev.includes(topicId);
      
      if (isSelected) {
        return prev.filter(id => id !== topicId && !subtopicIds.includes(id));
      } else {
        return [...prev, topicId, ...subtopicIds];
      }
    });
  };

  const handleSubtopicSelect = (topicId: string, subtopicId: string) => {
    setSelectedTopics(prev => {
      const isSelected = prev.includes(subtopicId);
      const topic = TOPICS.find(t => t.id === topicId);
      const subtopicIds = topic?.subtopics?.map(st => st.id) || [];
      
      if (isSelected) {
        return prev.filter(id => id !== subtopicId && id !== topicId);
      } else {
        const newSelection = [...prev, subtopicId];
        const allSubtopicsSelected = subtopicIds.every(id => newSelection.includes(id));
        return allSubtopicsSelected ? [...newSelection, topicId] : newSelection;
      }
    });
  };

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId],
    );
  };

  const isTopicSelected = (topic: Topic) => {
    return selectedTopics.includes(topic.id);
  };

  const isSubtopicSelected = (subtopicId: string) => {
    return selectedTopics.includes(subtopicId);
  };

  const isPartiallySelected = (topic: Topic) => {
    if (!topic.subtopics) return false;
    const subtopicIds = topic.subtopics.map(st => st.id);
    const selectedSubtopics = subtopicIds.filter(id => selectedTopics.includes(id));
    return selectedSubtopics.length > 0 && selectedSubtopics.length < subtopicIds.length;
  };

  const handleContinue = () => {
    navigation.navigate('TestConfiguration', {
      subjectId,
      subjectName,
      testType: 'topic',
      selectedTopics,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#339af0" />
        <Text style={styles.loadingText}>Loading topics...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="material-community"
            size={32}
            color="#212529"
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Select Topics</Text>
          <Text style={styles.subtitle}>{subjectName}</Text>
        </View>
      </View>

      {/* Topics List */}
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          {paddingHorizontal: width > 500 ? 32 : 16},
        ]}
        showsVerticalScrollIndicator={false}>
        {TOPICS.map(topic => (
          <View key={topic.id} style={styles.topicContainer}>
            <TouchableOpacity
              style={styles.topicHeader}
              activeOpacity={0.7}
              onPress={() => handleTopicSelect(topic.id)}>
              <View style={styles.topicHeaderLeft}>
                <Icon
                  name={isTopicSelected(topic) ? 'checkbox-marked' : isPartiallySelected(topic) ? 'minus-box' : 'checkbox-blank-outline'}
                  type="material-community"
                  size={24}
                  color={isTopicSelected(topic) || isPartiallySelected(topic) ? '#339af0' : '#868e96'}
                />
                <View>
                  <Text style={styles.topicName}>{topic.name}</Text>
                  <Text style={styles.questionCount}>
                    {topic.questionCount} questions
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.expandButton}
                activeOpacity={0.7}
                onPress={() => toggleTopicExpand(topic.id)}>
                <Icon
                  name={expandedTopics.includes(topic.id) ? 'chevron-up' : 'chevron-down'}
                  type="material-community"
                  size={24}
                  color="#868e96"
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Subtopics */}
            {expandedTopics.includes(topic.id) && topic.subtopics && (
              <View style={styles.subtopicsList}>
                {topic.subtopics.map(subtopic => (
                  <TouchableOpacity
                    key={subtopic.id}
                    style={styles.subtopicItem}
                    activeOpacity={0.7}
                    onPress={() => handleSubtopicSelect(topic.id, subtopic.id)}>
                    <Icon
                      name={isSubtopicSelected(subtopic.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                      type="material-community"
                      size={24}
                      color={isSubtopicSelected(subtopic.id) ? '#339af0' : '#868e96'}
                    />
                    <View>
                      <Text style={styles.subtopicName}>{subtopic.name}</Text>
                      <Text style={styles.questionCount}>
                        {subtopic.questionCount} questions
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.selectedCount}>
            {selectedTopics.length} topics selected
          </Text>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {opacity: selectedTopics.length > 0 ? 1 : 0.5},
            ]}
            activeOpacity={0.7}
            disabled={selectedTopics.length === 0}
            onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
            <Icon
              name="chevron-right"
              type="material-community"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
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
    marginTop: 4,
    letterSpacing: -0.3,
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
    gap: 8,
  },
  topicContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  topicHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    letterSpacing: -0.3,
  },
  questionCount: {
    fontSize: 14,
    color: '#868e96',
    letterSpacing: -0.3,
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtopicsList: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 8,
  },
  subtopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  subtopicName: {
    fontSize: 15,
    color: '#495057',
    letterSpacing: -0.3,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  selectedCount: {
    fontSize: 16,
    color: '#495057',
    letterSpacing: -0.3,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#339af0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.3,
  },
});
