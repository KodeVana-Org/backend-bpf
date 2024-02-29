import ApiManager from './ApiManager';

// Register new user
interface RegisterData {
  emailPhone: string;
  password: string;
}
interface OtpData {
  emailPhone: string;
  password: string;
  otp: string;
}

export const user_register = async (data: RegisterData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/register', data);
    return response.data;
  } catch (error: any) {
    return error.respose.data;
  }
};

export const verify_otp = async (data: OtpData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/verify-otp', data);
    return response.data.token;
  } catch (error: any) {
    return error.respose.data;
  }
};
