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
