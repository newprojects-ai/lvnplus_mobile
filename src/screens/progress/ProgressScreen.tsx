import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from '../../hooks';

export const ProgressScreen = () => {
  const {user} = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement progress data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Track your learning journey</Text>
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.card}>
            <Text>Coming Soon</Text>
            <Text>Performance tracking will be available in the next update.</Text>
          </View>
        </View>

        {/* Recent Tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Tests</Text>
          <View style={styles.card}>
            <Text>No tests taken yet</Text>
            <Text>Start taking tests to see your progress here.</Text>
          </View>
        </View>

        {/* Areas for Improvement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Areas for Improvement</Text>
          <View style={styles.card}>
            <Text>Coming Soon</Text>
            <Text>Detailed analytics will be available in the next update.</Text>
          </View>
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#868e96',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
});
