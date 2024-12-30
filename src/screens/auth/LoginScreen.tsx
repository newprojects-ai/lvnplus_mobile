import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Input} from '../../components/ui/Input';
import {Button} from '../../components/ui/Button';
import {RoleSelector, Role} from '../../components/ui/RoleSelector';
import {validateEmail, validateRequired} from '../../utils/validation';
import type {LoginData} from '../../types/auth';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store/slices/authSlice';
import {getFieldErrors} from '../../utils/error';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {loading, error: authError} = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as Role,
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    }

    if (!validateRequired(formData.role)) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await dispatch(login(formData)).unwrap();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      setErrors(prev => ({...prev, ...fieldErrors}));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>
          {authError && (
            <Text style={styles.error}>{authError}</Text>
          )}
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
            error={errors.password}
          />
          <RoleSelector
            value={formData.role}
            onChange={role => setFormData({...formData, role})}
            error={errors.role}
          />
          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />
          <Button
            title="Create Account"
            variant="secondary"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});