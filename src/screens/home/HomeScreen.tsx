import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {Button} from '../../components/ui/Button';
import {logout} from '../../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleStartTest = () => {
    navigation.navigate('ConfigureTest');
  };

  const handleProgress = () => {
    // TODO: Implement progress screen navigation
    Alert.alert(
      'Coming Soon',
      'Progress tracking will be available in the next update.',
    );
  };

  const handleGoals = () => {
    // TODO: Implement goals screen navigation
    Alert.alert(
      'Coming Soon',
      'Goal setting will be available in the next update.',
    );
  };

  const handleHelp = () => {
    // TODO: Implement help screen navigation
    Alert.alert(
      'Need Help?',
      'Please contact support at support@lvnplus.com for assistance.',
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
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
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'Student'}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleStartTest}>
              <View style={[styles.iconContainer, {backgroundColor: '#339af0'}]}>
                <Icon
                  name="book-open-variant"
                  type="material-community"
                  color="#fff"
                  size={24}
                />
              </View>
              <Text style={styles.actionTitle}>Start Test</Text>
              <Text style={styles.actionSubtitle}>Practice or take a test</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleProgress}>
              <View style={[styles.iconContainer, {backgroundColor: '#37b24d'}]}>
                <Icon
                  name="chart-line"
                  type="material-community"
                  color="#fff"
                  size={24}
                />
              </View>
              <Text style={styles.actionTitle}>Progress</Text>
              <Text style={styles.actionSubtitle}>View your progress</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleGoals}>
              <View style={[styles.iconContainer, {backgroundColor: '#f59f00'}]}>
                <Icon
                  name="flag-variant"
                  type="material-community"
                  color="#fff"
                  size={24}
                />
              </View>
              <Text style={styles.actionTitle}>Goals</Text>
              <Text style={styles.actionSubtitle}>Set learning goals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleHelp}>
              <View style={[styles.iconContainer, {backgroundColor: '#e64980'}]}>
                <Icon
                  name="help-circle"
                  type="material-community"
                  color="#fff"
                  size={24}
                />
              </View>
              <Text style={styles.actionTitle}>Help</Text>
              <Text style={styles.actionSubtitle}>Get support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.recentActivityContainer}>
            <Text style={styles.noActivityText}>No recent activity</Text>
          </View>
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          type="outline"
          containerStyle={styles.logoutButton}
        />
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
    flexGrow: 1,
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#868e96',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCard: {
    width: '50%',
    padding: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#868e96',
  },
  recentActivityContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  noActivityText: {
    color: '#868e96',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 24,
  },
});
