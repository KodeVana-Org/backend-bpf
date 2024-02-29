import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPassScreen from '../screens/auth/LoginPassScreen';
import LoginOtpScreen from '../screens/auth/LoginOtpScreen';
import ValidateCredentialScreen from '../screens/auth/ValidateCredentialScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SetPasswordScreen from '../screens/auth/SetPasswordScreen';
// import HomeScreen from '../screens/bottomTab/HomeScreen';

export type AuthParamList = {
  LoginPass: undefined;
  LoginOtp: undefined;
  ValidateCredential: undefined;
  VerifyOTPScreen: undefined;
  Register: undefined;
  SetPassword: undefined;
  // HomeScreen: undefined;
};

export default function AuthNavigator() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginPass" component={LoginPassScreen} />
      <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
      <Stack.Screen
        name="ValidateCredential"
        component={ValidateCredentialScreen}
      />
      <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
}
