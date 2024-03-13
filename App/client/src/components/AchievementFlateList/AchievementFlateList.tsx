import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {get_achievements} from '../../api/app_data_api';

const {width} = Dimensions.get('window');

const AchievementFlateList = () => {
  const [achievement, setAchievement] = useState([]);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await get_achievements();
        setAchievement(response.achievements);
        console.log(response.achievements);
      } catch (error) {
        console.error('Error fetching achievement:', error);
      }
    };

    fetchAchievement();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={achievement.reverse()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.achievementContainer}>
            <Image source={{uri: item.photo[0]}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
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
  achievementContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
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
  title: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default AchievementFlateList;
