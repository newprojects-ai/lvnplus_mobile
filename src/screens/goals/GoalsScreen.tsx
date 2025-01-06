import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {useAppSelector} from '../../hooks';

export const GoalsScreen = () => {
  const {user} = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement goals data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAddGoal = () => {
    // TODO: Implement add goal functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.subtitle}>Set and track your learning goals</Text>
        </View>

        {/* Add Goal Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Icon name="plus" type="material-community" color="#fff" size={24} />
          <Text style={styles.addButtonText}>Add New Goal</Text>
        </TouchableOpacity>

        {/* Current Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Goals</Text>
          <View style={styles.card}>
            <Text>No goals set</Text>
            <Text>Start by adding a new learning goal.</Text>
          </View>
        </View>

        {/* Completed Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed Goals</Text>
          <View style={styles.card}>
            <Text>No completed goals yet</Text>
            <Text>Your completed goals will appear here.</Text>
          </View>
        </View>

        {/* Goal Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Goals</Text>
          <View style={styles.card}>
            <Text>Coming Soon</Text>
            <Text>Personalized goal suggestions will be available soon.</Text>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#339af0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
