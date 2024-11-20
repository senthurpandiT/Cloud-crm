export interface ApiResponse {
  media?: any;
  headers?: any;
  body?: any;
  data?: any;
  session?: {
    token: any;
    validity: any;
    specialMessage: any;
  };
  status?: {
    code: string;
    status: string;
    message?: string;
  };
}


export interface selectedLanguage {
  code: string,
  flag: string
  id: number
  language: string
}

export interface loginInterface {
  emailId: string;
  password: string;
}
