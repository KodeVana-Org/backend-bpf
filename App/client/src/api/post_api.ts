import ApiManager from './ApiManager';

// Forgot Passsword set password

export const get_post = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('post/get-all-post');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing post:', error.message);
    return error.response.data;
  }
};
