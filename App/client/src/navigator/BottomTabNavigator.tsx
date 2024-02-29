import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/BottomButton/CustomBottomTab';
import HomeScreen from '../screens/bottomTab/HomeScreen';
import PostScreen from '../screens/bottomTab/PostScreen';
import VideoScreen from '../screens/bottomTab/VideoScreen';
import LiveScreen from '../screens/bottomTab/LiveScreen';
import ConferenceScreen from '../screens/bottomTab/ConferenceScreen';

export type BottomTabParamList = {
  Home: undefined;
  Post: undefined;
  Video: undefined;
  Live: undefined;
  Conference: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Video" component={VideoScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Conference" component={ConferenceScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
