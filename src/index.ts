import express from 'express';
import dotenv from 'dotenv';
import {
  createCompany,
  createContact,
  createSchedule,
  getHelps,
  getMillionUserHash,
  getMillionZapCompany,
  getMillionZapPlans
} from './api';
import morgan from 'morgan';
import cors from 'cors';
import {getAuthToken} from './auth';
import axios from 'axios';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.json());
let companies: any[] = [];

const allowedOrigins = [
  'https://app.milliontech.com.br',
  'https://beta.milliontech.com.br',
  'https://app.millionzap.com.br',
  'https://beta.millionzap.com.br'
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log('origin', origin);
      if (
        !origin ||
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.ENV_MODE === 'DEV'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

app.get('/helps', async (req, res) => {
  try {
    const helps = await getHelps();
    res.json(helps);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.post('/millionzap/login', async (req, res) => {
  try {
    const {body} = req;
    const {passwordHash, email} = body;
    console.log(body);
    const data = await getAuthToken(undefined, email);
    console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.post('/millionzap/schedules/create', async (req, res) => {
  try {
    const {body} = req;

    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.slice(7)
      : '';

    const apiData = await createSchedule({data: body, token});
    res.json(apiData);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
app.post('/millionzap/contacts/create', async (req, res) => {
  try {
    const {body} = req;
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.slice(7)
      : '';

    const apiData = await createContact({data: body, token});
    res.json(apiData);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/millionzap/company', async (req, res) => {
  try {
    const {searchParam, fieldName} = req.query;

    const apiData = await getMillionZapCompany({searchParam, fieldName});
    res.json(apiData);
  } catch (error) {
    // console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.get('/millionzap/plans', async (req, res) => {
  try {
    const apiData = await getMillionZapPlans();
    res.json(apiData);
  } catch (error) {
    // console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.get('/millionzap/user/hash/:email', async (req, res) => {
  try {
    const {email} = req.params;

    const apiData = await getMillionUserHash(email);
    res.json({passwordHash: encodeURIComponent(apiData?.passwordHash)});
  } catch (error) {
    // console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.post('/millionzap/company/create', async (req, res) => {
  try {
    const {body} = req;

    const apiData = await createCompany({data: body});
    res.json(apiData);
  } catch (error) {
    // console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.get('/millionzap', async (req, res) => {
  try {
    const companyData = companies.find(
      item => (item.user.email = req?.body?.user?.email)
    );
    if (companyData) return res.json(companyData);

    return res.json({message: 'Company not found'});
  } catch (error) {
    console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.post('/millionzap', async (req, res) => {
  try {
    if (!companies.find(item => (item.company.id = req?.body?.company?.id))) {
      console.log('n achou');
      companies.push({...req?.body});

      return res.json({message: 'Company add success'});
    }
    return res.json({message: 'Company has added'});
  } catch (error) {
    console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
