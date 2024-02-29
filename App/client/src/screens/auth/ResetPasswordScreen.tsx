import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChevronLeftLight from '../../assets/icons/ChevronLeftLight';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigator/AuthNavigator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  const handleResendOtpButton = () => {
    // TODO: Activate the button if the timer is over and when user clicks on the button sesend another OTP and disable the button again for the defined amount of time;
  };

  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.flagGradient}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FF671F', '#fff', '#046A38']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View>
        <View style={styles.flagContainer}>
          <View style={[styles.flagSection, styles.flagSaffron]} />
          <View style={[styles.flagSection, styles.flagWhite]}>
            <Image
              style={styles.partyEmplem}
              source={require('../../assets/images/PartyEmblem.png')}
            />
          </View>
          <View style={[styles.flagSection, styles.flagGreen]} />
          <Text style={styles.flagLebel}>Bodoland People's Front</Text>
        </View>
        <Text style={styles.formHeader}>Forgot Password?</Text>
        <View style={styles.formContainer}>
          <View style={[styles.inputFieldContainer, styles.emailPhoneInput]}>
            <Text style={styles.inputFieldLebel}>Email or Phone Number</Text>
            <TextInput
              keyboardType="phone-pad"
              inputMode="email"
              style={styles.inputField}
            />
          </View>
          <View style={[styles.inputFieldContainer, styles.otpInput]}>
            <Text style={styles.inputFieldLebel}>OTP</Text>
            <View style={styles.otpInputFieldContainer}>
              <TextInput
                keyboardType="numeric"
                inputMode="numeric"
                maxLength={4}
                style={styles.otpInputField}
                selectionColor="#000"
              />
              <View style={styles.otpInputUnderlineContainer}>
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
              </View>
            </View>
          </View>
          <View style={styles.resendOtpBtnContainer}>
            <Pressable
              style={styles.resendOtpBtn}
              disabled={true}
              onPress={handleResendOtpButton}>
              {/* TODO: Change color to '#000' if the button is active and change to gray id the button is disabled */}
              <Text style={[styles.resendOtpLebel, {color: 'gray'}]}>
                Resend OTP
              </Text>
            </Pressable>
            {/* TODO: Change color to green if the timer is running and change to 'gray' if timer has stoppped */}
            <Text style={[styles.resendOtpTimer, {color: 'green'}]}>
              01 : 59
            </Text>
          </View>
          <View style={styles.submitBtnContainer}>
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnLebel}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerBtnLebel}>Don't have an account? </Text>
            <Pressable
              style={styles.registerBtn}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerBtnText}>Register</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.otpLoginBtn}
            onPress={() => navigation.navigate('LoginOtp')}>
            <Text style={styles.otpLoginText}>Login with OTP</Text>
          </Pressable>
        </View>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipBtnLebel}>Skip</Text>
          <ChevronLeftLight width={16} height={16} style={styles.skipIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  flagContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  flagSection: {
    width: 120,
    height: 30,
  },
  flagSaffron: {
    backgroundColor: '#FF671F',
  },
  flagWhite: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyEmplem: {
    width: 40,
    height: 30,
  },
  flagGreen: {
    backgroundColor: '#046A38',
  },
  flagLebel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  flagGradient: {
    width: windowWidth,
    height: windowHeight - 150,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 100,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 100,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    color: '#fff',
  },
  formContainer: {
    gap: 10,
    width: windowWidth - 30,
    marginHorizontal: 50,
    marginBottom: 10,
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    opacity: 50,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {elevation: 4}),
  },
  inputFieldContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {elevation: 3}),
  },
  inputFieldLebel: {
    color: '#000',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  emailPhoneInput: {
    marginBottom: 5,
  },
  otpInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 4,
    paddingTop: 0,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    width: '100%',
  },
  otpInputFieldContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otpInputField: {
    color: 'gray',
    letterSpacing: 15,
    paddingLeft: 8,
    margin: 0,
    fontSize: 16,
    padding: 0,
    width: 115,
  },
  otpInputUnderlineContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  otpInputUnderline: {
    height: 1,
    width: 15,
    backgroundColor: 'gray',
  },
  resendOtpBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  resendOtpBtn: {
    padding: 0,
    margin: 0,
  },
  resendOtpLebel: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendOtpTimer: {
    fontSize: 14,
  },
  submitBtnContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 140,
    marginHorizontal: 'auto',
    backgroundColor: '#046A38',
    borderRadius: 10,
  },
  submitBtnLebel: {
    color: '#fff',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnLebel: {
    color: '#000',
    fontSize: 14,
  },
  registerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  registerBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  otpLoginBtn: {
    padding: 0,
    marginTop: 0,
    alignItems: 'center',
  },
  otpLoginText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  skipBtn: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#FF671F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  skipBtnLebel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  skipIcon: {
    transform: [{rotate: '180deg'}],
  },
});
