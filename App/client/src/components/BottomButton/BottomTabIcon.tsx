import React from 'react';
import {View} from 'react-native';
import HomeIcon from '../../assets/icons/home.svg';
import PostIcon from '../../assets/icons/gallery.svg';
import VideoIcon from '../../assets/icons/video.svg';
import LiveIcon from '../../assets/icons/live.svg';
import UserGroupIcon from '../../assets/icons/userGroup.svg';

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({route, isFocused}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocused: boolean) => {
    let height: number = 20;
    let width: number = 20;

    switch (route) {
      case 'Home':
        return (
          <HomeIcon
            width={width}
            height={height}
            fill={isFocused ? 'white' : 'gray'}
          />
        );
      case 'Post':
        return (
          <PostIcon
            width={width}
            height={height}
            fill={isFocused ? 'white' : 'gray'}
          />
        );
      case 'Video':
        return (
          <VideoIcon
            width={22}
            height={22}
            fill={isFocused ? 'white' : 'gray'}
          />
        );
      case 'Live':
        return (
          <LiveIcon
            width={width}
            height={height}
            fill={isFocused ? 'white' : 'gray'}
          />
        );
      case 'Conference':
        return (
          <UserGroupIcon
            width={width}
            height={height}
            fill={isFocused ? 'white' : 'gray'}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
