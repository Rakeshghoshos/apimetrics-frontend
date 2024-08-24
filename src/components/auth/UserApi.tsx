import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import apiEndPoints from "../../core/apiEndPoints";

async function loginApi(loginData:any): Promise<AxiosResponse>{
    const client = axios.create({
        baseURL: apiEndPoints.login,
      });

    const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
      };

      try {
        const response: AxiosResponse = await client.post('/', loginData, config);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function signUpApi(signUpData:any):Promise<AxiosResponse>{
  const client = axios.create({
    baseURL: apiEndPoints.signUp,
  });

const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
    } as RawAxiosRequestHeaders,
  };

  try {
    const response: AxiosResponse = await client.post('/', signUpData, config);
    if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
    }
    return response;
} catch (error) {
    throw error;
}
}

const user = {
    loginApi,
    signUpApi
};

export default user;