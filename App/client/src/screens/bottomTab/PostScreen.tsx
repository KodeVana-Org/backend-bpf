import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';
import Drawer from '../../components/Drawer/CustomSideDrawer';
import Header from '../../components/Header/Header';
import FAB from '../../components/FloatingActionButton/FAB';
import {get_post} from '../../api/post_api';

const PostScreen = () => {
  const [post, setPost] = useState([]);
  const active = useSharedValue(false);
  const drawerWidth = useSharedValue(1000);
  const drawerTranslateX = useSharedValue(-drawerWidth.value);

  const animatedStyle = useAnimatedStyle(() => {
    const containerTranslateX = interpolate(
      drawerTranslateX.value,
      [-drawerWidth.value, 0],
      [0, 100],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateX: containerTranslateX}],
    };
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const result = await get_post();
      if (result.data) {
        setPost(result.posts.postImages);
        console.log('Data fetched successfully:', result);
      } else if (result.status !== 200) {
        console.log('Error during accessing posts', result);
      }
    } catch (error) {
      console.error('Error logging user:', error);
      console.error(error);
    }
  };

  return (
    <SafeAreaProvider>
      <Drawer
        active={active}
        translateX={drawerTranslateX}
        drawerWidth={drawerWidth}
      />
      <Header title="Posts" active={active} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={[styles.container, animatedStyle]}>
            <View>
              {post.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.postImage}
                />
              ))}
            </View>
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      <FAB />
    </SafeAreaProvider>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 750,
  },
  postImage: {
    height: 200,
    width: 200,
  },
});
