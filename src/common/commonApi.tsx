import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import apiEndPoints from "../../src/core/apiEndPoints";
import Storage from '../core/storage';

async function mostUsedApi(): Promise<AxiosResponse>{
    const client = axios.create({
        baseURL: apiEndPoints.mostUsed,
      });

    const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Authorization' : `Bearer ${Storage.getValues('token')}`,
        } as RawAxiosRequestHeaders,
      };

      try {
        const response: AxiosResponse = await client.post('/', {}, config);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const commonApi = {
    mostUsedApi
}

export default commonApi;
