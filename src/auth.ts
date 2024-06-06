import axios from 'axios';

export const getAuthToken = async (): Promise<string> => {
  const loginUrl = process.env.LOGIN_URL;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!loginUrl || !email || !password) {
    throw new Error('Login URL, email, or password is not defined in the environment variables');
  }

  const response = await axios.post(loginUrl, {
    email,
    password
  });

  return response.data.token;
};
