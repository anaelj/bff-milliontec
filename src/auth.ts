import axios from 'axios';

export const getAuthToken = async (
  paramPasswordHash?: string,
  paramEmail?: string
): Promise<any> => {
  const loginUrl = process.env.LOGIN_URL;
  const email = paramEmail || process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!loginUrl || !email || !password) {
    throw new Error(
      'Login URL, email, or password is not defined in the environment variables'
    );
  }

  // console.log(paramPasswordHash, email);

  const response = await axios.post(loginUrl, {
    email,
    password: !paramPasswordHash && password,
    passwordHash: paramPasswordHash
  });

  return response.data;
};
