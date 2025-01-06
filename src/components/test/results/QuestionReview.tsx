import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';

type QuestionReviewProps = {
  question: {
    id: string;
    content: string;
    options: string[];
    correctAnswer: string;
    userAnswer?: string;
    explanation?: string;
  };
};

export const QuestionReview: React.FC<QuestionReviewProps> = ({question}) => {
  const [expanded, setExpanded] = useState(false);

  const isCorrect = question.userAnswer === question.correctAnswer;
  const isSkipped = !question.userAnswer;

  const getStatusColor = () => {
    if (isSkipped) return '#868e96';
    return isCorrect ? '#37b24d' : '#e03131';
  };

  const getStatusIcon = () => {
    if (isSkipped) return 'minus-circle';
    return isCorrect ? 'check-circle' : 'close-circle';
  };

  const renderOption = (option: string, index: number) => {
    const isUserAnswer = option === question.userAnswer;
    const isCorrectAnswer = option === question.correctAnswer;

    let backgroundColor = '#fff';
    let borderColor = '#dee2e6';
    let textColor = '#495057';

    if (isUserAnswer && isCorrectAnswer) {
      backgroundColor = '#d3f9d8';
      borderColor = '#37b24d';
      textColor = '#2b8a3e';
    } else if (isUserAnswer) {
      backgroundColor = '#ffe3e3';
      borderColor = '#e03131';
      textColor = '#c92a2a';
    } else if (isCorrectAnswer && expanded) {
      backgroundColor = '#d3f9d8';
      borderColor = '#37b24d';
      textColor = '#2b8a3e';
    }

    return (
      <View
        key={index}
        style={[
          styles.option,
          {
            backgroundColor,
            borderColor,
          },
        ]}>
        <Text style={[styles.optionText, {color: textColor}]}>{option}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}>
        <View style={styles.statusContainer}>
          <Icon
            name={getStatusIcon()}
            type="material-community"
            color={getStatusColor()}
            size={24}
          />
          <Text
            style={[
              styles.status,
              {
                color: getStatusColor(),
              },
            ]}>
            {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
          </Text>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          type="material-community"
          color="#868e96"
          size={24}
        />
      </TouchableOpacity>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.content}</Text>
      </View>

      {expanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => renderOption(option, index))}
          </View>
          {question.explanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanation}>{question.explanation}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  questionContainer: {
    padding: 16,
  },
  question: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 15,
  },
  explanationContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
