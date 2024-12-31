import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export type Role = 'student' | 'parent' | 'tutor';

interface RoleSelectorProps {
  value: Role;
  onChange: (role: Role) => void;
  error?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const roles: Array<{role: Role; label: string}> = [
    {role: 'student', label: 'Student'},
    {role: 'parent', label: 'Parent'},
    {role: 'tutor', label: 'Tutor'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>I am a</Text>
      <View style={styles.buttonGroup}>
        {roles.map(({role, label}) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.button,
              value === role && styles.selectedButton,
            ]}
            onPress={() => onChange(role)}>
            <Text
              style={[
                styles.buttonText,
                value === role && styles.selectedButtonText,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
  error: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
});
