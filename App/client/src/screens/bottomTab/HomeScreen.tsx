import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';

import Header from '../../components/Header/Header';
import ImageCarousal from '../../components/Corousel/ImageCarousal';
import PostFlatList from '../../components/PostFlatlist/PostFlatList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList} from '../../navigator/BottomTabNavigator';
import {DrawerParamList} from '../../navigator/DrawerNavigator';
import GalleryFlatlist from '../../components/GalleryFlatlist/GalleryFlatlist';

const HomeScreen = ({navigation}: any) => {
  const bottomNavigation =
    useNavigation<StackNavigationProp<BottomTabParamList>>();
  const drawerNavigation =
    useNavigation<StackNavigationProp<DrawerParamList>>();

  return (
    <SafeAreaProvider>
      <Header title="Bodoland Peoples' Front" drawerNavigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={[styles.container]}>
            <ImageCarousal />
            {/* PostList */}
            <View style={styles.postListContainer}>
              <View style={styles.headerNav}>
                <View>
                  <Text style={styles.sectionheader}>Recent Posts</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      bottomNavigation.navigate('Post');
                    }}
                    style={styles.viewAllBtn}>
                    <Text style={styles.viewAllBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal style={styles.image}>
                <PostFlatList horizontal={true} marginType="right" />
              </ScrollView>
            </View>
            {/* Gallery */}
            <View style={styles.galleryListContainer}>
              <View style={styles.headerNav}>
                <View>
                  <Text style={styles.sectionheader}>Gallery</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      drawerNavigation.navigate('Gallery');
                    }}
                    style={styles.viewAllBtn}>
                    <Text style={styles.viewAllBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal style={styles.image}>
                <GalleryFlatlist horizontal={true} marginType="right" />
              </ScrollView>
            </View>
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 300,
  },
  postListContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  galleryListContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },
  headerNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionheader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  image: {
    marginTop: 10,
  },
  viewAllBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 7,
    marginTop: 7,
    padding: 0,
    width: 80,
    backgroundColor: '#046A38',
  },
  viewAllBtnText: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 0,
  },
});
