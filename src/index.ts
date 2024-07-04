import express from 'express';
import dotenv from 'dotenv';
import {getHelps, getMillionZapCompany} from './api';
import morgan from 'morgan';
import cors from 'cors';
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
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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

app.get('/millionzap-company', async (req, res) => {
  try {
    const {searchParam, fieldName} = req.query;

    const apiData = await getMillionZapCompany({searchParam, fieldName});
    res.json(apiData);
  } catch (error) {
    // console.log('error', error);
    res.status(500).json({error: error.message});
  }
});

//{"company":{"id":1,"mainCompanyId":null,"typePeople":"legal","name":"DC Tecnologia","corporateName":"TECNOLOGIA DC SOLUCOES E INOVACOES TECNOLOGICAS LTDA","cpf":"99999999999","cnpj":"24672246000179","stateRegistration":"796.454.193.117","municipalRegistration":"276651","taxRegime":"normal regime","cnae":"8888","rntrc":null,"responsible":"Danilo","cell":"(11) 94454-6544","phone":"(11) 2421-3368","email":"dan-sk@hotmail.com","website":null,"notes":null,"logo":"image-1658502415586-660360022.jpeg","zipCode":"07.044-090","address":"Rua Deus do Sol","number":"218","district":"Vila São Rafael","complement":null,"city":"Guarulhos","state":"PI","onBusinessDay":"y","businessDayOpenHour":null,"businessDayCloseHour":null,"onSaturday":"y","saturdayOpenHour":null,"saturdayCloseHour":null,"onSunday":"y","sundayOpenHour":null,"sundayCloseHour":null,"profileId":11,"permissions":"[1,83,12,18,20,23,33,2,3,4,5,6,7,74,8,9,30,75,10,11,84,85,86,87,88,89,90,91,92,93,94,13,14,15,16,17,19,32,76,21,22,31,24,25,26,27,73,28,29,40,34,44,52,65,68,41,42,43,35,36,37,38,39,45,46,47,48,49,50,77,78,53,54,55,56,57,58,59,60,61,66,67,69,70,71,72]","status":-1,"blockMessage":null,"responsibleType":"n","isSuper":"y","createdDate":"2022-07-05T16:21:05.832Z","updatedDate":"2024-06-15T16:14:56.582Z","sendBeforeDueDate":"n","sendInDueDate":"y","sendAfterDueDate":"n","beforeDay":0,"afterDay":0,"sendEmailBeforeDueDate":"y","sendWhatsappBeforeDueDate":"n","sendEmailInDueDate":"y","sendWhatsappInDueDate":"y","sendEmailAfterDueDate":"y","sendWhatsappAfterDueDate":"n","nfApiId":24515,"digitalCertificate":"file-1677681499200-116763412.p12","digitalCertificatePassword":"12345678","nfEnv":"homologation","nfeManifestMaxVersion":15,"pdvDreSubCategoryId":2,"pdvStockLocationId":18,"blockDayForChangeOfBillsSituationOfPastMonth":5,"businessCategory":"OPTICS","plan":{"id":163,"companyId":1,"planId":1,"expirationDate":null,"alertMsg":null,"value":0,"paymentDate":"2024-04-05T21:21:49.598Z","active":"y","requireToSubscribe":"n","paymentApiSubscriptionId":null,"payerAccountantId":null,"cancelRequested":"n","cancelRequestedAt":null,"cancellationDate":null,"planIdToDowngradeTo":null,"downgradeRequestedAt":null,"downgradeDate":null,"planToDowngradeToPaymentDetails":null,"planIdToUpgradeTo":null,"upgradeRequestedAt":null,"upgradeDate":null,"planToUpgradeToPaymentDetails":null,"createdDate":"2024-04-05T21:21:37.062Z","updatedDate":"2024-04-05T21:21:37.062Z","expired":false,"daysToExpire":null,"subscriptionPlan":{"id":1,"profileId":1,"name":"Interlig","description":"","img":null,"value":0,"max_customers":-1,"max_products":-1,"max_nfe":-1,"max_nfce":-1,"max_cte":-1,"max_mdfe":-1,"max_nfse":-1,"max_billets":-1,"max_events":-1,"max_users":-1,"max_storage":-1,"max_logged_users":-1,"max_branches":1,"paymentFrequency":"none","paymentFrequencyDaysAmount":null,"durationType":"no_duration","duration":null,"visible":"n","createdDate":"2022-07-07T18:29:00.701Z","updatedDate":"2024-07-03T22:37:33.127Z","millionZapPlanId":5}}},"user":{"id":1,"companyId":1,"isAccountant":"n","branchesIds":"[26]","firstname":"Danilo","lastname":"DC","userProfileId":null,"email":"danilo@tecnologiadc.com.br","cell":"81 98300-0093","login":"danilo master","canAccessMainCompany":"y","isAdmin":"n","isSuper":"y","photo":"image-1683826881221-912307633.png","active":"y","permissions":"[1,12,18,20,23,33,2,3,4,5,6,7,74,8,9,30,75,10,11,13,14,15,16,17,19,32,76,21,22,31,24,25,26,27,28,73,29,40,34,44,52,65,68,41,42,43,35,36,37,38,39,45,46,47,48,49,50,77,78,53,54,55,56,57,58,59,60,61,66,67,69,70,71,72,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96]","extraMenuPermissions":"[{\"menuId\":24,\"key\":\"canChangeBillSituationOfPastMonth\"},{\"menuId\":25,\"key\":\"canChangeBillSituationOfPastMonth\"}]","fastAccess":"[1,12,18,20,23,2,3,4,5,6,7,74,8,9,30,75,10,11,95]","theme":null,"menuTheme":null,"menuType":null,"accessRoute":null,"resetPasswordToken":"8bec454a1f9d07df2b13173a92491196da8ecd0f","requiresCellVerification":"n","cellVerifiedAt":null,"createdDate":"2022-07-05T16:21:05.832Z","updatedDate":"2023-09-11T17:39:25.911Z"}}

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

// https://api.beta.millionconversa.com/companies/cadastro

// {
//   "name": "empresa de teste 01",
//   "email": "teste01@gmail.com",
//   "phone": "67984058301",
//   "password": "123456",
//   "planId": 5,
//   "recurrence": "MENSAL",
//   "dueDate": "2024-07-05T16:21:04-04:00",
//   "status": "t",
//   "campaignsEnabled": true
// }
