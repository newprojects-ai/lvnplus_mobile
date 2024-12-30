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
import {validateEmail, validatePassword, validateRequired} from '../../utils/validation';
import type {RegisterData} from '../../types/auth';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {register} from '../../store/slices/authSlice';
import {getFieldErrors} from '../../utils/error';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {loading, error: authError} = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student',
  });
  const [errors, setErrors] = useState<Partial<RegisterData>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await dispatch(register(formData)).unwrap();
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
          <Text style={styles.title}>Create Account</Text>
          {authError && (
            <Text style={styles.error}>{authError}</Text>
          )}
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={text => setFormData({...formData, firstName: text})}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={text => setFormData({...formData, lastName: text})}
            error={errors.lastName}
          />
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
          <Button
            title="Register"
            onPress={handleRegister}
            loading={loading}
            style={styles.button}
          />
          <Button
            title="Back to Login"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
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
  },
  form: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});