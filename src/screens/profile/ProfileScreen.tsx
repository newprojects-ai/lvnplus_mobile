import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Avatar} from '@rneui/themed';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {Button} from '../../components/ui/Button';
import {logout} from '../../store/slices/authSlice';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'account',
      onPress: () => {},
    },
    {
      title: 'Test History',
      icon: 'history',
      onPress: () => {},
    },
    {
      title: 'Progress Reports',
      icon: 'chart-line',
      onPress: () => {},
    },
    {
      title: 'Settings',
      icon: 'cog',
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={100}
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              containerStyle={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Icon
                name="pencil"
                type="material-community"
                color="#fff"
                size={16}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Student'}</Text>
          <Text style={styles.email}>{user?.email || 'student@example.com'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemContent}>
                <Icon
                  name={item.icon}
                  type="material-community"
                  color="#495057"
                  size={24}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon
                name="chevron-right"
                type="material-community"
                color="#adb5bd"
                size={24}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />

        <Text style={styles.version}>Version 1.0.0</Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#e9ecef',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#339af0',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#868e96',
  },
  menuContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#495057',
  },
  logoutButton: {
    marginBottom: 16,
  },
  version: {
    textAlign: 'center',
    color: '#adb5bd',
    fontSize: 14,
  },
});
