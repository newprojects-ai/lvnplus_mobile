import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {Button} from '../../components/ui/Button';
import {logout} from '../../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList, MainTabParamList} from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = NativeStackNavigationProp<MainStackParamList & MainTabParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleStartTest = () => {
    navigation.navigate('Tests', { screen: 'TestSelection' });
  };

  const handleProgress = () => {
    navigation.navigate('Progress');
  };

  const handleGoals = () => {
    navigation.navigate('Goals');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const quickActions = [
    {
      title: 'Start Test',
      subtitle: 'Practice or take a test',
      icon: 'book-open-variant',
      gradient: ['#6366F1', '#4F46E5'],
      onPress: handleStartTest,
    },
    {
      title: 'Progress',
      subtitle: 'View your progress',
      icon: 'chart-line',
      gradient: ['#10B981', '#059669'],
      onPress: handleProgress,
    },
    {
      title: 'Goals',
      subtitle: 'Set learning goals',
      icon: 'flag-variant',
      gradient: ['#F59E0B', '#D97706'],
      onPress: handleGoals,
    },
    {
      title: 'Help',
      subtitle: 'Get support',
      icon: 'help-circle',
      gradient: ['#EC4899', '#DB2777'],
      onPress: handleHelp,
    },
  ];

  return (
    <LinearGradient
      colors={['#6366F1', '#4338CA']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor="#fff"
            />
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
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={action.title}
                  style={styles.actionCard} 
                  onPress={action.onPress}
                  activeOpacity={0.9}>
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionCardContent}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name={action.icon}
                        type="material-community"
                        color="#fff"
                        size={24}
                      />
                    </View>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.recentActivityCard}>
              <Text style={styles.noActivityText}>No recent activity</Text>
            </View>
          </View>

          {/* Logout Button */}
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            style={styles.logoutButton}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const {width} = Dimensions.get('window');
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
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
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
  actionCardContent: {
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  recentActivityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noActivityText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
