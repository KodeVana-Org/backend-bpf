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
import LinearGradient from 'react-native-linear-gradient';
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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrorMessageVisible, setPasswordErrorMessageVisible] =
    useState(false);
  const [
    confirmPasswordErrorMessageVisible,
    setConfirmPasswordErrorMessageVisible,
  ] = useState(false);

  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPasswordInputChange = (text: string) => {
    setConfirmPassword(text);
  };
  const errorMessageType = (message: string) => {
    setErrorMessage(message);
  };

  // Validate Password
  const validatePassword = () => {
    if (password === '') {
      errorMessageType('Password is required!');
      setPasswordErrorMessageVisible(true);
    } else if (password.length < 5) {
      errorMessageType('Should be of min 5 character!');
      setPasswordErrorMessageVisible(true);
    } else if (password.length > 32) {
      errorMessageType('Should be of max 32 character!');
      setPasswordErrorMessageVisible(true);
    } else if (confirmPassword === '') {
      setPasswordErrorMessageVisible(false);
      errorMessageType('Confirm password is required!');
      setConfirmPasswordErrorMessageVisible(true);
    } else if (password !== confirmPassword) {
      errorMessageType("Password doesn't match!");
      setPasswordErrorMessageVisible(true);
      setConfirmPasswordErrorMessageVisible(true);
    } else {
      return true;
    }
  };

  const handleSaveButton = () => {
    if (validatePassword()) {
      // TODO: Check if credential already exit and redirect to OTPAuthenthicationScreen;
      console.log('Yay! Form Submitted Successfully');
      navigation.navigate('VerifyOTPScreen');
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
          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputFieldLebel}>Password*</Text>
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
              <Text style={{color: 'red', marginTop: 5}}>{errorMessage}</Text>
            ) : null}
          </View>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputFieldLebel}>Confirm Password*</Text>
            <View style={styles.passwordInput}>
              <TextInput
                onChangeText={handleConfirmPasswordInputChange}
                value={confirmPassword}
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
            {confirmPasswordErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>{errorMessage}</Text>
            ) : null}
          </View>
          <View style={styles.saveBtnContainer}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveButton}>
              <Text style={styles.saveBtnLebel}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  saveBtnContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 140,
    marginHorizontal: 'auto',
    backgroundColor: '#046A38',
    borderRadius: 10,
  },
  saveBtnLebel: {
    color: '#fff',
    fontSize: 18,
  },
});
