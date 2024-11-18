// src/environments/environment.prod.ts
export const environment = {
  production: true,
  mapApiurl:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyCURgryfWW9u4ZIqd8mtCzEt9takkR6ZMw&q=',
  apiUrl: 'https://api2.seesafeit.dk/api/',
  socketURL: 'https://api2.seesafeit.dk/',
  imageapiurl: 'https://api2.seesafeit.dk/',
  qrurl: 'https://planit.seesafeit.dk',
  imgURL: 'https://seesafeit-files-storage.s3.eu-north-1.amazonaws.com/',
  lastclicktime: 120000,
  pageNumber: 1,
  pagelimit: 25,
  maxlength: {
    customer_no: '14',
    company_name: '36',
    address: '36',
    zipcode: '10',
    city: '20',
    email: '30',
    branch_no: '14',
    branch_name: '36',
  },
};
