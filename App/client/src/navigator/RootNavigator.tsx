import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import SideDrawerNavigator from './DrawerNavigator';
import JoinScreen from '../screens/JoinScreen';
import DonateScreen from '../screens/DonateScreen';
import NotificationScreen from '../screens/NotificationScreen';
import EditMemberScreen from '../screens/admin/EditMemberScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  AuthNavigator: undefined;
  BottomTabNavigator: undefined;
  SideDrawerNavigator: undefined;
  JoinScreen: undefined;
  DonateScreen: undefined;
  NotificationScreen: undefined;
  EditMemberScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
  //   null,
  // );

  // useEffect(() => {
  //   const checkAppFirstLaunch = async () => {
  //     try {
  //       const appData = await AsyncStorage.getItem('isAppFirstLaunched');
  //       if (appData === null) {
  //         setIsAppFirstLaunched(true);
  //         AsyncStorage.setItem('isAppFirstLaunched', 'false');
  //       } else {
  //         setIsAppFirstLaunched(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking app first launch:', error);
  //     }
  //   };

  //   checkAppFirstLaunch();
  // }, []);

  // if (isAppFirstLaunched === null) {
  //   // Loading state, can render a loading spinner or placeholder
  //   return null;
  // }

  return (
    <Stack.Navigator
      // initialRouteName={isAppFirstLaunched ? 'OnboardingScreen' : 'Main'}
      initialRouteName={'AuthNavigator'}
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
      {/*_*\ Temp Screens \*_*/}
      <Stack.Screen
        name="EditMemberScreen"
        component={EditMemberScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SideDrawerNavigator"
        component={SideDrawerNavigator}
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
