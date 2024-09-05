import axios from 'axios';
import {getAuthToken} from './auth';
import {constants} from 'buffer';

interface MillionZapCompanyParams {
  searchParam?: any;
  fieldName?: any;
}

interface MillionZapCompanyCreateParams {
  data: any;
}

export const getHelps = async () => {
  const {token} = await getAuthToken();
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

export const createContact = async ({data, token}: any) => {
  // https://app.millionzap.com.br/login//
  // " target="_blank" rel="noopener noreferrer"><span class="menu-text">MillionZap</span></a>

  // const email = 'pavaop77@gmail.com';
  // const hashPassword =
  //   '%242a%2408%24hu4YAMSZJDQdAAPUQi1ljufNaBMfAy%2F1%2F2RDk1kiMVxZGwGnCZm5y';

  const url = process.env.MILLIONZAP_CONTACT_CREATE_URL;

  const {contacts} = await listContact(data.number, token);

  if (contacts && Array.isArray(contacts) && contacts.length > 0) {
    return contacts[0];
  }

  if (!url) {
    throw new Error(
      'MILLIONZAP_CONTACT_CREATE_URL is not defined in the environment variables'
    );
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const listContact = async (phoneNumber: string, token: string) => {
  const url = `${process.env.MILLIONZAP_CONTACT_CREATE_URL}?searchParam=${phoneNumber.trim()}&pageNumber=1`;

  if (!url) {
    throw new Error(
      'MILLIONZAP_CONTACT_CREATE_URL is not defined in the environment variables'
    );
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.count === 0) {
      const url2 = `${process.env.MILLIONZAP_CONTACT_CREATE_URL}?searchParam=${phoneNumber.trim().slice(-8)}&pageNumber=1`;
      const response2 = await axios.get(url2, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response2.data;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createSchedule = async ({data, token}: any) => {
  const url = process.env.MILLIONZAP_SCHEDULE_CREATE_URL;

  if (!url) {
    throw new Error(
      'MILLIONZAP_SCHEDULE_CREATE_URL is not defined in the environment variables'
    );
  }

  const contact = await createContact({data: data.contact, token});

  try {
    const response = await axios.post(
      url,
      {...data.schedule, contactId: contact.id},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
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
  const {token} = await getAuthToken();

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
  const {token} = await getAuthToken();

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
