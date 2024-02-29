import * as yup from 'yup';

// Input field validation schema
const emailOrPhoneSchema = yup
  .string()
  .required('This field is required')
  .test('emailOrPhone', 'Must be a valid email or phone number', value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  });
const passwordSchema = yup
  .string()
  .required('This field is required')
  .min(6, 'Password must be at least 6 characters long');

export const validationSchema = yup.object().shape({
  emailOrPhone: emailOrPhoneSchema,
  password: passwordSchema,
});
