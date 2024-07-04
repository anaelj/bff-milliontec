import axios from 'axios';
import {getAuthToken} from './auth';

interface MillionZapCompanyParams {
  searchParam?: any;
  fieldName?: any;
}

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

export const getMillionZapCompany = async ({
  searchParam,
  fieldName
}: MillionZapCompanyParams) => {
  const token = await getAuthToken();

  const url = `${process.env.MILLIONZAP_COMPANY_SEARCH_URL}?searchParam=${searchParam}&fieldName=${fieldName}`;

  if (!url) {
    throw new Error(
      'MILLIONZAP_COMPANY_SEARCH_URL is not defined in the environment variables'
    );
  }

  console.log(url);

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
