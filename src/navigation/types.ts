import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Home: undefined;
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;