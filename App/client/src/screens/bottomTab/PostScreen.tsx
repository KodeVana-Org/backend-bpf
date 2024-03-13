import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';
import Header from '../../components/Header/Header';
import PostFlatList from '../../components/PostFlatlist/PostFlatList';

const PostScreen = ({navigation}: any) => {
  return (
    <SafeAreaProvider>
      <Header title="Posts" drawerNavigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={styles.container}>
            <PostFlatList horizontal={false} marginType="bottom" />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 750,
    marginTop: 20,
  },
  postImage: {
    height: 200,
    width: 200,
  },
});
