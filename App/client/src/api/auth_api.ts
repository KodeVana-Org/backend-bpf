import ApiManager from './ApiManager';

// Register new user
interface RegisterData {
  emailPhone: string;
}

export const user_register = async (data: RegisterData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Error occurred during user registration:', error.message);
    return error.response.data;
  }
};

// Verify OTP
interface OtpData {
  emailPhone: string;
  password: string;
  otp: string;
}

export const verify_otp = async (data: OtpData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/verify-otp', data);
    return response.data;
  } catch (error: any) {
    console.error('Error occurred during OTP verification:', error.message);
    return error.response.data;
  }
};

// Login user
interface OtpData {
  emailPhone: string;
  password: string;
}

export const user_login = async (data: OtpData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/login', data);
    return response.data;
  } catch (error: any) {
    return error.respose.data;
  }
};
