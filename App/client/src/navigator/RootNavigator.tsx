import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import SideDrawerNavigator from './DrawerNavigator';
import SplashScreen from '../screens/SplashScreen';
import JoinScreen from '../screens/JoinScreen';
import DonateScreen from '../screens/DonateScreen';
import NotificationScreen from '../screens/NotificationScreen';
import EditMemberScreen from '../screens/admin/EditMemberScreen';
import {AppContext} from './AppContext';

export type RootStackParamList = {
  SplashScreen: undefined;
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
  const [showSplash, setShowSplash] = useState(true);
  const {navigateToHome} = useContext(AppContext);
  const [tokenExist, setTokenExist] = useState(false);

  useEffect(() => {
    handleGetToken();
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    // console.log(token);
    if (token) {
      setTokenExist(true);
    } else {
      setTokenExist(false);
    }
  };

  return (
    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
      {showSplash ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : navigateToHome || tokenExist ? (
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="EditMemberScreen"
        component={EditMemberScreen}
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
