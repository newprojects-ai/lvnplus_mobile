import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TestStackParamList} from '../../navigation/types';
import {Icon} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = NativeStackNavigationProp<TestStackParamList, 'TopicSelection'>;

type Topic = {
  id: string;
  name: string;
  subtopics: Subtopic[];
};

type Subtopic = {
  id: string;
  name: string;
  selected?: boolean;
};

const TOPICS: Topic[] = [
  {
    id: '1',
    name: 'Algebra',
    subtopics: [
      {id: '1.1', name: 'Simplifying Expressions'},
      {id: '1.2', name: 'Solving Equations'},
    ],
  },
  {
    id: '2',
    name: 'Data Handling',
    subtopics: [
      {id: '2.1', name: 'Bar Charts and Line Graphs'},
      {id: '2.2', name: 'Pie Charts'},
    ],
  },
];

export const TopicSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
  const [selectedSubtopicIds, setSelectedSubtopicIds] = useState<Set<string>>(new Set());

  const handleSubtopicToggle = (topicId: string, subtopicId: string) => {
    setSelectedSubtopicIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subtopicId)) {
        newSet.delete(subtopicId);
        // If no subtopics are selected for this topic, unselect the topic
        const hasSelectedSubtopics = topics
          .find(t => t.id === topicId)
          ?.subtopics.some(s => newSet.has(s.id));
        if (!hasSelectedSubtopics) {
          setSelectedTopicIds(prev => {
            const newTopics = new Set(prev);
            newTopics.delete(topicId);
            return newTopics;
          });
        }
      } else {
        newSet.add(subtopicId);
        // When selecting a subtopic, also select its parent topic
        setSelectedTopicIds(prev => {
          const newTopics = new Set(prev);
          newTopics.add(topicId);
          return newTopics;
        });
      }
      return newSet;
    });
  };

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopicIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        // If unselecting a topic, also unselect all its subtopics
        newSet.delete(topicId);
        setSelectedSubtopicIds(prev => {
          const newSubtopics = new Set(prev);
          const topic = topics.find(t => t.id === topicId);
          topic?.subtopics.forEach(s => newSubtopics.delete(s.id));
          return newSubtopics;
        });
      } else {
        // If selecting a topic, also select all its subtopics
        newSet.add(topicId);
        setSelectedSubtopicIds(prev => {
          const newSubtopics = new Set(prev);
          const topic = topics.find(t => t.id === topicId);
          topic?.subtopics.forEach(s => newSubtopics.add(s.id));
          return newSubtopics;
        });
      }
      return newSet;
    });
  };

  const handleNext = () => {
    navigation.navigate('TestConfiguration', {
      selectedTopics: Array.from(selectedTopicIds),
      selectedSubtopics: Array.from(selectedSubtopicIds),
    });
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#4338CA']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              type="material-community"
              size={24}
              color="#fff"
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Topic-wise Practice</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>Select topics to practice</Text>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {topics.map(topic => (
              <View key={topic.id} style={styles.topicCard}>
                <View style={styles.topicHeader}>
                  <Text style={styles.topicName}>{topic.name}</Text>
                  <Switch
                    value={selectedTopicIds.has(topic.id)}
                    onValueChange={() => handleTopicToggle(topic.id)}
                    trackColor={{false: '#E5E7EB', true: '#818CF8'}}
                    thumbColor={selectedTopicIds.has(topic.id) ? '#6366F1' : '#fff'}
                    ios_backgroundColor="#E5E7EB"
                  />
                </View>
                <Text style={styles.subtopicsLabel}>Subtopics:</Text>
                {topic.subtopics.map(subtopic => (
                  <TouchableOpacity
                    key={subtopic.id}
                    style={styles.subtopicItem}
                    activeOpacity={0.7}
                    onPress={() => handleSubtopicToggle(topic.id, subtopic.id)}>
                    <Text style={styles.subtopicName}>{subtopic.name}</Text>
                    <View style={styles.checkContainer}>
                      {selectedSubtopicIds.has(subtopic.id) ? (
                        <Icon
                          name="check-circle"
                          type="material-community"
                          size={20}
                          color="#6366F1"
                        />
                      ) : (
                        <View style={styles.emptyCheckCircle} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                opacity:
                  selectedTopicIds.size > 0 || selectedSubtopicIds.size > 0
                    ? 1
                    : 0.5,
              },
            ]}
            disabled={selectedTopicIds.size === 0 && selectedSubtopicIds.size === 0}
            activeOpacity={0.8}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  topicCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtopicsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  subtopicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  subtopicName: {
    fontSize: 16,
    color: '#1F2937',
  },
  checkContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
