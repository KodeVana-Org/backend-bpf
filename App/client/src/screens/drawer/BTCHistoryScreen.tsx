import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const HistoryScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>
            The Bodoland People's Front (BPF) is a state political party in
            Assam, India. The party is headquartered in Kokrajhar Town and
            previously was in ruling government in the autonomous region of
            Bodoland. The BPF was formed as political party in year 2005,
            Hagrama Mohilary and Emmanuel Mosahary were selected as the
            President and the General Secretary of the new party. Hagrama
            Mohilary formed the first Elected Executive Bodoland Territorial
            Council after the end of the election. Bodoland Peoples Front formed
            as per the resolution Vide No. 3, adopted in the Political
            convention held on 4th and 5th December 2005, as per BPF
            constitution, BPF shall bear true faith and allegiance to the
            constitution of India as established by law and to the principles of
            democracy, socialism and secularism as enshrined in the Indian
            Constitution, and also solemnly affirm our commitment to work for
            upholding the sovereignty, unity and integrity of India. To work for
            strengthening the Indian Nationalism providing due respect to the
            identities of all sections of people. The party began its journey in
            the 2011 Assam Legislative election where the party stormed and
            surprised everyone by winning 12 seats. The party also became the
            3rd largest party behind INC and AIUDF, and this was considering the
            fact that the party had only contested 29 seats. Ahead of the 2016
            Assam legislative election the party joined the National Democratic
            Alliance. The party was assigned 16 seats as per the agreement and
            won the same 12 seats. Despite just winning 12 seats the party had
            the best winning percentage and was part of the government in Assam.
            Then in 2021 the party left National Democratic Alliance and joined
            the United Progressive Alliance ahead of the 2021 Assam election.
            The party was assigned 12 seats and only ended up winning 4 seats,
            later the party decided to formally announce its departure from
            United Progressive Alliance, due to poor performance in the
            election.
          </Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    // backgroundColor: '#1d2733',
    paddingHorizontal: 15,
    backgroundColor: '#252d3a',
  },
});
