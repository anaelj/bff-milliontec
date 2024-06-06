import axios from 'axios';
import {getAuthToken} from './auth';

export const getHelps = async () => {
  const token = await getAuthToken();
  const helpsUrl = process.env.HELPS_URL;

  if (!helpsUrl) {
    throw new Error('HELPS_URL is not defined in the environment variables');
  }

  const response = await axios.get(helpsUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
