import {ImageSourcePropType} from 'react-native';

export interface MessageType {
  name: string;
  image: ImageSourcePropType;
  message: string;
}

export interface DrawerListType {
  name: string;
  icon: ImageSourcePropType;
}

export const message: MessageType[] = [];

const profileImages: ImageSourcePropType[] = [
  require('../assets/images/Profile1.png'),
  require('../assets/images/Profile2.png'),
  require('../assets/images/Profile3.png'),
  require('../assets/images/Profile4.png'),
  require('../assets/images/Profile5.png'),
  require('../assets/images/Profile6.png'),
  require('../assets/images/Profile7.png'),
  require('../assets/images/Profile8.png'),
  require('../assets/images/Profile9.png'),
  require('../assets/images/Profile10.png'),
];

const names: string[] = [
  'Peter Parker',
  'Tony Stark',
  'Steve Rogers',
  'Thor',
  'Bruce Banner',
  'Natasha Romanoff',
  'Clint Barton',
  'Loki',
  'Stephen Strange',
  'Carol Danvers',
  'Scott Lang',
  'Hope van Dyne',
  'Wanda Maximoff',
  'Vision',
  'Sam Wilson',
  'Bucky Barnes',
  'Peter Quill',
  'Gamora',
  'Drax',
  'Rocket',
];

const greetings: string[] = [
  'Hello',
  'Hi there',
  'Hey',
  'Greetings',
  'Dear',
  'Good day',
];

const feelings: string[] = [
  'I hope you are well today.',
  "How's your day going?",
  'I wanted to say hello.',
  "I've always admired your work.",
];

const hopes: string[] = [
  "I hope you're having a fantastic day.",
  'Wishing you a wonderful day ahead.',
  'I hope life is treating you kindly.',
  'Keep shining!',
];

for (let i = 1; i <= 20; i++) {
  const randomProfileIndex = Math.floor(Math.random() * profileImages.length);
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];
  const randomFeeling = feelings[Math.floor(Math.random() * feelings.length)];
  const randomHope = hopes[Math.floor(Math.random() * hopes.length)];

  const messages = `${randomGreeting}, it's ${names[randomNameIndex]}. ${randomFeeling} ${randomHope}`;

  message.push({
    name: names[randomNameIndex],
    image: profileImages[randomProfileIndex],
    message: messages,
  });
}
