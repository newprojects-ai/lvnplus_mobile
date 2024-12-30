import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ConfigStepper} from '../../components/test/ConfigStepper';
import {TestTypePicker} from '../../components/test/TestTypePicker';
import {TimingPicker} from '../../components/test/TimingPicker';
import {TopicSelector} from '../../components/test/TopicSelector';
import {QuestionCountPicker} from '../../components/test/QuestionCountPicker';
import {ReviewStep} from '../../components/test/ReviewStep';
import {Button} from '../../components/ui/Button';
import type {TestType, TimingType, TimeLimit, TestConfigStep, TestPlan} from '../../types/test';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchTopics, createTestPlan} from '../../store/slices/testSlice';

const STEPS: TestConfigStep[] = [
  {key: 'type', title: 'Test Type', completed: false},
  {key: 'timing', title: 'Timing', completed: false},
  {key: 'topics', title: 'Topics', completed: false},
  {key: 'questions', title: 'Questions', completed: false},
  {key: 'review', title: 'Review', completed: false},
];

export const ConfigureTestScreen = () => {
  const dispatch = useAppDispatch();
  const {topics, loading} = useAppSelector(state => state.test);
  const {user} = useAppSelector(state => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(STEPS);
  const [config, setConfig] = useState({
    testType: 'TOPIC' as TestType,
    timingType: 'TIMED' as TimingType,
    timeLimit: 30 as TimeLimit,
    selectedTopics: [] as string[],
    selectedSubtopics: [] as string[],
    questionCount: 20,
  });

  React.useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const markStepComplete = (stepIndex: number) => {
    setSteps(prev =>
      prev.map((step, index) => ({
        ...step,
        completed: index <= stepIndex,
      })),
    );
  };

  const handleNext = () => {
    markStepComplete(currentStep);
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleCreate = async () => {
    if (!user) return;

    const plan: Partial<TestPlan> = {
      testType: config.testType,
      timingType: config.timingType,
      timeLimit: config.timeLimit,
      studentId: parseInt(user.id),
      plannedBy: parseInt(user.id),
      configuration: {
        topics: config.selectedTopics.map(Number),
        subtopics: config.selectedSubtopics.map(Number),
        totalQuestionCount: config.questionCount,
      },
    };

    try {
      await dispatch(createTestPlan(plan)).unwrap();
      // Navigate back or show success message
    } catch (error) {
      // Handle error
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].key) {
      case 'type':
        return (
          <TestTypePicker
            value={config.testType}
            onChange={type => setConfig(prev => ({...prev, testType: type}))}
          />
        );
      case 'timing':
        return (
          <TimingPicker
            timingType={config.timingType}
            timeLimit={config.timeLimit}
            onChangeType={type => setConfig(prev => ({...prev, timingType: type}))}
            onChangeLimit={limit => setConfig(prev => ({...prev, timeLimit: limit}))}
          />
        );
      case 'topics':
        return (
          <TopicSelector
            topics={topics}
            selectedTopics={config.selectedTopics}
            selectedSubtopics={config.selectedSubtopics}
            onTopicSelect={topicId =>
              setConfig(prev => ({
                ...prev,
                selectedTopics: [...prev.selectedTopics, topicId],
              }))
            }
            onSubtopicSelect={subtopicId =>
              setConfig(prev => ({
                ...prev,
                selectedSubtopics: [...prev.selectedSubtopics, subtopicId],
              }))
            }
          />
        );
      case 'questions':
        return (
          <QuestionCountPicker
            value={config.questionCount}
            onChange={count => setConfig(prev => ({...prev, questionCount: count}))}
          />
        );
      case 'review':
        return <ReviewStep config={config} topics={topics} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ConfigStepper
        steps={steps}
        currentStep={currentStep}
        onStepPress={index => setCurrentStep(index)}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>
      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            title="Back"
            variant="secondary"
            onPress={handleBack}
            style={styles.footerButton}
          />
        )}
        <Button
          title={currentStep === steps.length - 1 ? 'Create' : 'Next'}
          onPress={currentStep === steps.length - 1 ? handleCreate : handleNext}
          loading={loading}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerButton: {
    flex: 1,
  },
});