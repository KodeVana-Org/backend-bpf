import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import {StripeProvider, loadStripe} from '@stripe/stripe-react-native';

const stripePromise = loadStripe(
  'pk_test_51OiBeaSD2KrIGIYFUb88hPcL2jeDdgwEpYfns9naabv8rGSICeDl2L6D1orpJWy2YRJyMdJts4Xx6BBJwtHdpFuk00mqSGN9Dm',
);

const DonateScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/checkout', {
        name: name,
        email: email,
        amount: amount,
      });
      console.log(response.data.id);
      const {error} = await stripePromise.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NavHeader />
          <StripeProvider publishableKey="pk_test_51OiBeaSD2KrIGIYFUb88hPcL2jeDdgwEpYfns9naabv8rGSICeDl2L6D1orpJWy2YRJyMdJts4Xx6BBJwtHdpFuk00mqSGN9Dm">
            <Text>DonateScreen</Text>
            <View style={styles.donateForm}>
              <Text>Checkout</Text>
              <View>
                <Text>Name:</Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
              <View>
                <Text>Email:</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View>
                <Text>Amount (INR):</Text>
                <TextInput
                  style={styles.textInput}
                  value={amount}
                  onChangeText={text => setAmount(text)}
                  keyboardType="numeric"
                />
              </View>
              <Button title="Checkout" onPress={handleCheckout} />
            </View>
          </StripeProvider>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    backgroundColor: 'white',
  },
  donateForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
