import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components/ui/Button';
import {useAppDispatch, useAppSelector} from '../hooks';
import {logout} from '../store/slices/authSlice';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName}!</Text>
      <Button title="Logout" onPress={handleLogout} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});