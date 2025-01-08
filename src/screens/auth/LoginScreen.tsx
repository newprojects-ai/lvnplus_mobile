import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Input} from '../../components/ui/Input';
import {Button} from '../../components/ui/Button';
import {validateEmail, validateRequired} from '../../utils/validation';
import type {LoginData} from '../../types/auth';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store/slices/authSlice';
import {getFieldErrors} from '../../utils/error';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@rneui/themed';

type Role = 'student' | 'parent';

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

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // TODO: Implement social login
    console.log(`${provider} login clicked`);
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#4338CA']}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Login to continue your learning</Text>
            </View>

            <Text style={styles.label}>I am a</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[
                  styles.roleButton,
                  formData.role === 'student' && styles.roleButtonActive
                ]}
                onPress={() => setFormData({...formData, role: 'student'})}>
                <View style={[
                  styles.radioOuter,
                  formData.role === 'student' && styles.radioOuterActive
                ]}>
                  {formData.role === 'student' && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.roleText,
                  formData.role === 'student' && styles.roleTextActive
                ]}>Student</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.roleButton,
                  formData.role === 'parent' && styles.roleButtonActive
                ]}
                onPress={() => setFormData({...formData, role: 'parent'})}>
                <View style={[
                  styles.radioOuter,
                  formData.role === 'parent' && styles.radioOuterActive
                ]}>
                  {formData.role === 'parent' && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.roleText,
                  formData.role === 'parent' && styles.roleTextActive
                ]}>Parent</Text>
              </TouchableOpacity>
            </View>

            {authError && (
              <Text style={styles.error}>{authError}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <Input
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              error={errors.email}
              containerStyle={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="••••••••"
              secureTextEntry
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              error={errors.password}
              containerStyle={styles.input}
            />

            <TouchableOpacity 
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('google')}>
                <Icon name="google" type="font-awesome" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('apple')}>
                <Icon name="apple" type="font-awesome" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: Math.min(400, width - 32),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  roleButtonActive: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#6366F1',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6366F1',
  },
  roleText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  roleTextActive: {
    color: '#6366F1',
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    height: 48,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  signupText: {
    color: '#6B7280',
    fontSize: 14,
  },
  signupLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});