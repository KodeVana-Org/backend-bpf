import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category} from '../../data/data.member';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';
import AccordionNested from './AccordionNested';

type Props = {
  value: Category;
  type: string;
};

const Accordion = ({value, type}: Props) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              heightValue.value = withTiming(measure(listRef)!.height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}
        style={styles.titleContainer}>
        <Text style={styles.textTitle}>{value.title}</Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          {type === 'regular' &&
            value.content.map((v, i) => {
              return (
                <View key={i} style={styles.content}>
                  <Text style={styles.textContent}>{v}</Text>
                </View>
              );
            })}
          {type === 'nested' && (
            <>
              <View style={styles.content}>
                <Text style={styles.textContent}>{value.content}</Text>
              </View>
              {value.contentNested.map((val, ind) => {
                return (
                  <View>
                    {/* <Text></Text> */}
                    <AccordionNested
                      value={val}
                      key={ind}
                      parentHeighValue={heightValue}
                    />
                  </View>
                );
              })}
            </>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d2733',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0F56B3',
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#252d3a',
  },
  textContent: {
    fontSize: 14,
    color: 'white',
  },
});
