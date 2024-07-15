import axios from 'axios';
import {getAuthToken} from './auth';

interface MillionZapCompanyParams {
  searchParam?: any;
  fieldName?: any;
}

interface MillionZapCompanyCreateParams {
  data: any;
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

export const createCompany = async ({data}: MillionZapCompanyCreateParams) => {
  const url = process.env.MILLIONZAP_COMPANY_CREATE_URL;

  if (!url) {
    throw new Error(
      'MILLIONZAP_COMPANY_CREATE_URL is not defined in the environment variables'
    );
  }

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
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

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getMillionZapPlans = async () => {
  const url = `${process.env.MILLIONZAP_PLANS_URL}`;

  if (!url) {
    throw new Error(
      'MILLIONZAP_PLANS_URL is not defined in the environment variables'
    );
  }

  const response = await axios.get(url);

  return response.data;
};

export const getMillionUserHash = async (email: string) => {
  const token = await getAuthToken();

  const url = `${process.env.MILLIONZAP_USER_HASH_URL}/${email}`;

  if (!url) {
    throw new Error(
      'MILLIONZAP_USER_HASH_URL is not defined in the environment variables'
    );
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
