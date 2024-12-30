import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {Topic} from '../../types/test';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopics: string[];
  selectedSubtopics: string[];
  onTopicSelect: (topicId: string) => void;
  onSubtopicSelect: (subtopicId: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  selectedTopics,
  selectedSubtopics,
  onTopicSelect,
  onSubtopicSelect,
}) => {
  return (
    <View style={styles.container}>
      {topics.map(topic => (
        <View key={topic.id} style={styles.topicContainer}>
          <TouchableOpacity
            style={[
              styles.topicHeader,
              selectedTopics.includes(topic.id) && styles.selectedTopic,
            ]}
            onPress={() => onTopicSelect(topic.id)}>
            <Text style={styles.topicTitle}>{topic.name}</Text>
          </TouchableOpacity>
          
          <View style={styles.subtopicsContainer}>
            {topic.subtopics.map(subtopic => (
              <TouchableOpacity
                key={subtopic.id}
                style={[
                  styles.subtopic,
                  selectedSubtopics.includes(subtopic.id) && styles.selectedSubtopic,
                ]}
                onPress={() => onSubtopicSelect(subtopic.id)}>
                <Text style={styles.subtopicText}>{subtopic.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  topicContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  topicHeader: {
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedTopic: {
    backgroundColor: '#007AFF',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtopicsContainer: {
    padding: 8,
    gap: 8,
  },
  subtopic: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  selectedSubtopic: {
    backgroundColor: '#007AFF20',
  },
  subtopicText: {
    fontSize: 14,
    color: '#666',
  },
});