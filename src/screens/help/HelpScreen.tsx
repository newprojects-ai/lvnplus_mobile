import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';

type HelpSection = {
  title: string;
  description: string;
  icon: string;
  action: () => void;
};

export const HelpScreen = () => {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@lvnplus.com');
  };

  const handleVisitFAQ = () => {
    Linking.openURL('https://lvnplus.com/faq');
  };

  const handleVisitGuides = () => {
    Linking.openURL('https://lvnplus.com/guides');
  };

  const helpSections: HelpSection[] = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: 'email',
      action: handleEmailSupport,
    },
    {
      title: 'FAQ',
      description: 'Find answers to common questions',
      icon: 'frequently-asked-questions',
      action: handleVisitFAQ,
    },
    {
      title: 'User Guides',
      description: 'Learn how to use the app',
      icon: 'book-open-page-variant',
      action: handleVisitGuides,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>

        {/* Help Options */}
        <View style={styles.optionsContainer}>
          {helpSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={section.action}>
              <View style={styles.iconContainer}>
                <Icon
                  name={section.icon}
                  type="material-community"
                  color="#339af0"
                  size={32}
                />
              </View>
              <Text style={styles.optionTitle}>{section.title}</Text>
              <Text style={styles.optionDescription}>{section.description}</Text>
              <Icon
                name="chevron-right"
                type="material-community"
                color="#868e96"
                size={24}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Having trouble?</Text>
            <Text style={styles.cardText}>
              Our support team is available 24/7 to help you with any questions or
              issues you may have.
            </Text>
            <TouchableOpacity
              style={styles.supportButton}
              onPress={handleEmailSupport}>
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e7f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  optionDescription: {
    flex: 2,
    fontSize: 14,
    color: '#868e96',
    marginRight: 8,
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 16,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: '#339af0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
