import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {get_posts} from '../../api/app_data_api';

const {width} = Dimensions.get('window');

const PostFlatList = ({
  horizontal,
  marginType,
}: {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get_posts();
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const calculateMargin = () => {
    if (marginType === 'bottom') {
      return {marginBottom: 20};
    } else {
      return {marginRight: 20};
    }
  };

  // Filter posts if marginType is 'right'
  const filteredPosts = marginType === 'right' ? posts.slice(0, 5) : posts;

  return (
    <View style={[styles.container, calculateMargin()]}>
      <FlatList
        data={filteredPosts.reverse()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingRight: horizontal ? 16 : 0}}
        renderItem={({item}) => (
          <View style={[styles.postContainer, calculateMargin()]}>
            <Image source={{uri: item.postImages}} style={styles.image} />
            <Text style={styles.text}>{item.postComment}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: width - 40,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 7,
  },
  text: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default PostFlatList;
