import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import apiEndPoints from "../../core/apiEndPoints";
import Storage from '../../core/storage';

async function metricsApi(data:any): Promise<AxiosResponse>{
    const client = axios.create({
        baseURL: apiEndPoints.apiMetrics,
      });

    const config: AxiosRequestConfig = {
        headers: {
          'Accept': 'application/json',
          'Authorization' : `Bearer ${Storage.getValues('token')}`,
        } as RawAxiosRequestHeaders,
      };

      try {
        const response: AxiosResponse = await client.post('/', data, config);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const apiMetrics = {
    metricsApi
}

export default apiMetrics;
