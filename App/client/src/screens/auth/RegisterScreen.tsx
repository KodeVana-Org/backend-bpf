// http://localhost:6969/user/register
import React, {useState} from 'react';
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
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ChevronLeftLight from '../../assets/icons/ChevronLeftLight';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigator/AuthNavigator';
import EyeClose from '../../assets/icons/EyeClose';
import EyeOpen from '../../assets/icons/EyeOpen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailPhoneErrorMessage, setEmailPhoneErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailPhoneErrorMessageVisible, setEmailPhoneErrorMessageVisible] =
    useState(false);
  const [passwordErrorMessageVisible, setPasswordErrorMessageVisible] =
    useState(false);

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const phoneRegex = /^\d{10}$/;
  const handleEmailPhoneInputChange = (text: string) => {
    setEmailPhone(text);
  };
  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };
  const emailPhoneErrorMessageType = (message: string) => {
    setEmailPhoneErrorMessage(message);
  };
  const passwordErrorMessageType = (message: string) => {
    setPasswordErrorMessage(message);
  };

  // Validate Email or Phone
  const validateEmailPhone = () => {
    if (emailPhone === '') {
      emailPhoneErrorMessageType('This field is required!');
      validatePassword();
      setEmailPhoneErrorMessageVisible(true);
    } else if (emailPhone.length < 5) {
      emailPhoneErrorMessageType('Should be of min 5 character!');
      validatePassword();
      setEmailPhoneErrorMessageVisible(true);
    } else if (emailPhone.length > 32) {
      emailPhoneErrorMessageType('Should be of max 32 character!');
      validatePassword();
      setEmailPhoneErrorMessageVisible(true);
    } else if (/[a-zA-Z]/g.test(emailPhone) || emailPhone.includes('@')) {
      if (!emailRegex.test(emailPhone)) {
        emailPhoneErrorMessageType('Please enter a valid email address!');
        validatePassword();
        setEmailPhoneErrorMessageVisible(true);
      } else {
        setEmailPhoneErrorMessageVisible(false);
        return true;
      }
    } else if (!phoneRegex.test(emailPhone)) {
      emailPhoneErrorMessageType('Please enter a valid phone number!');
      validatePassword();
      setEmailPhoneErrorMessageVisible(true);
    } else {
      setEmailPhoneErrorMessageVisible(false);
      return true;
    }
  };

  // Validate Password
  const validatePassword = () => {
    if (password === '') {
      passwordErrorMessageType('This field is required!');
      setPasswordErrorMessageVisible(true);
    } else if (password.length < 5) {
      passwordErrorMessageType('Should be of min 5 character!');
      setPasswordErrorMessageVisible(true);
    } else if (password.length > 32) {
      passwordErrorMessageType('Should be of max 32 character!');
      setPasswordErrorMessageVisible(true);
    } else {
      return true;
    }
  };
  // interface ApiResponse {
  //   data: any; // Define the structure of the 'data' field based on your backend response
  //   message: string;
  // }

  // const handleRegisterUser = async () => {
  const handlesendOTPButton = async () => {
    if (validateEmailPhone() && validatePassword()) {
      // TODO: Check if credential already exit and redirect to OTPAuthenthicationScreen;

      // try {
      //   // setIsLoading(true);
      //   // setError(null);

      //   const response = await axios.post(
      //     'http://localhost:6969/user/register',
      //     emailPhone,
      //   );
      //   if (
      //     response.data.data &&
      //     response.data.message === 'OTP sent successfully. Please verify.'
      //   ) {
      //     console.log('Registration Successful'); // Log success message
      //     navigation.navigate('AuthenthicationOTP');
      //   } else {
      //     console.log('Registration failed'); // Log failure message
      //   }
      // } catch (error) {
      //   console.error(error);
      //   console.log('Yoops! registration failed.');
      // } finally {
      //   // setIsLoading(false);
      // }

      axios
        .post('http://localhost:6969/user/register', emailPhone)
        .then(response => {
          console.log(response.data.data);
          console.log('Yay! data send successfully.');
        })
        .catch(error => {
          if (error.response) {
            // Server responded with a status other than 200 range
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log('Server responded with a status other than 200 range');
          } else if (error.request) {
            // Request was made but no response was received
            console.log(error.request);
            console.log('Request was made but no response was received');
          } else {
            // Error occurred in setting up the request
            console.error('Error', error.message);
            console.log('Error occurred in setting up the request');
          }
        });
    }
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
        <Text style={styles.formHeader}>New Register</Text>
        <View style={styles.formContainer}>
          <View style={[styles.inputFieldContainer, styles.emailPhoneInput]}>
            <Text style={styles.inputFieldLebel}>Email or Phone Number</Text>
            <TextInput
              inputMode="email"
              onChangeText={handleEmailPhoneInputChange}
              value={emailPhone}
              style={styles.inputField}
            />
            {emailPhoneErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>
                {emailPhoneErrorMessage}
              </Text>
            ) : null}
          </View>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputFieldLebel}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                onChangeText={handlePasswordInputChange}
                value={password}
                secureTextEntry={hidePassword ? true : false}
                style={[styles.inputField, styles.passwordInputField]}
              />
              <Pressable
                style={styles.hidePassBtn}
                onPress={toggleHidePassword}>
                {hidePassword ? (
                  <EyeClose height={20} width={20} />
                ) : (
                  <EyeOpen height={20} width={20} />
                )}
              </Pressable>
            </View>
            {passwordErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>
                {passwordErrorMessage}
              </Text>
            ) : null}
          </View>
          <View style={styles.sendOTPContainer}>
            <TouchableOpacity
              style={styles.sendOTP}
              onPress={handlesendOTPButton}>
              <Text style={styles.sendOTPLebel}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginBtnLebel}>Already have an account?</Text>
            <Pressable style={styles.loginBtn}>
              <Text
                style={styles.loginBtnText}
                onPress={() => navigation.navigate('LoginPass')}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipBtnLebel}>Skip</Text>
          <ChevronLeftLight width={16} height={16} style={styles.skipIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  flagContainer: {
    alignItems: 'center',
    marginTop: 25,
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
    height: windowHeight - 160,
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
    marginBottom: 25,
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
  passwordInput: {
    alignItems: 'center',
    flexDirection: 'row',
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
  passwordInputField: {
    width: '90%',
  },
  hidePassBtn: {
    justifyContent: 'flex-end',
  },
  sendOTPContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  sendOTP: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 140,
    marginHorizontal: 'auto',
    backgroundColor: '#046A38',
    borderRadius: 10,
  },
  sendOTPLebel: {
    color: '#fff',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnLebel: {
    color: '#000',
    fontSize: 14,
  },
  loginBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  loginBtnText: {
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
    marginTop: 20,
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
