import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  route: string;
  isFocused: boolean;
}

const DrawerItems = ({route, isFocused}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderDrawerItem = (route: string, isFocused: boolean) => {
    switch (route) {
      case 'History':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            History of BTC
          </Text>
        );
      case 'Mission':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            Missions of BPF
          </Text>
        );
      case 'Achievement':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            Achievements
          </Text>
        );
      case 'Vision':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            Visions
          </Text>
        );
      case 'Committee':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            BPF Committee
          </Text>
        );
      case 'Message':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            Message
          </Text>
        );
      case 'Gallery':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            Gallery
          </Text>
        );
      case 'About':
        return (
          <Text style={(styles.text, {color: isFocused ? 'white' : 'gray}'})}>
            About BPF
          </Text>
        );
      default:
        break;
    }
  };

  return <View>{renderDrawerItem(route, isFocused)}</View>;
};

export default DrawerItems;

const styles = StyleSheet.create({
  text: {
    paddingVertical: 12,
    marginBottom: 2,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});
