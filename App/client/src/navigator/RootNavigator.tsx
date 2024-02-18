import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import BottomTabNavigator from './BottomTabNavigator';
import JoinScreen from '../screens/JoinScreen';
import DonateScreen from '../screens/DonateScreen';
import NotificationScreen from '../screens/NotificationScreen';
import BTCHistoryScreen from '../screens/BTCHistoryScreen';
import MissionScreen from '../screens/MissionScreen';
import AchievementScreen from '../screens/AchievementScreen';
import VissionScreen from '../screens/VissionScreen.tsx';
import CommitteeScreen from '../screens/CommitteeScreen';
import MessageScreen from '../screens/MessageScreen.tsx';
import GalleryScreen from '../screens/GalleryScreen';
import AboutScreen from '../screens/AboutScreen.tsx';

export type RootStackParamList = {
  Onboarding: undefined;
  BottomTabNavigator: undefined;
  JoinScreen: undefined;
  DonateScreen: undefined;
  NotificationScreen: undefined;
  BTCHistoryScreen: undefined;
  MissionScreen: undefined;
  AchievementScreen: undefined;
  VissionScreen: undefined;
  CommitteeScreen: undefined;
  MessageScreen: undefined;
  GalleryScreen: undefined;
  AboutScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkAppFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData === null) {
          setIsAppFirstLaunched(true);
          AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        console.error('Error checking app first launch:', error);
      }
    };

    checkAppFirstLaunch();
  }, []);

  if (isAppFirstLaunched === null) {
    // Loading state, can render a loading spinner or placeholder
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isAppFirstLaunched ? 'OnboardingScreen' : 'BottomTabNavigator'
      }
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JoinScreen"
        component={JoinScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DonateScreen"
        component={DonateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BTCHistoryScreen"
        component={BTCHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MissionScreen"
        component={MissionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AchievementScreen"
        component={AchievementScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VissionScreen"
        component={VissionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommitteeScreen"
        component={CommitteeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
