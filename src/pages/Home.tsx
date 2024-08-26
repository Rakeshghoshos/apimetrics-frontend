import React,{useState ,useEffect} from 'react';
import commonApi from '../common/commonApi';
import _ from "lodash";

interface ApiData {
  apiCount: number;
  mostCalls: {
    _id: string;
    apiName: string;
    lastCallResponseTime: number;
    totalCallsDaily: number;
    totalCallsWeekly: number;
    totalCallsMonthly: number;
  }[];
  mostResponseTime: {
    _id: string;
    apiName: string;
    lastCallResponseTime: number;
    avgResponseTimeDaily: number;
    minResponseTimeDaily: number;
    maxResponseTimeDaily: number;
  }[];
}


function Home() {
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await commonApi.mostUsedApi();
      if (response?.data) {
        setData(response?.data?.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">API Statistics</h1>
        
        {/* API Count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700">Total API Count: {data?.apiCount || 0}</h2>
        </div>
        
        {/* Most Calls Table */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Most Calls</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">API Name</th>
                <th className="border-b py-2">Last Call Response Time (ms)</th>
                <th className="border-b py-2">Total Calls Daily</th>
                <th className="border-b py-2">Total Calls Weekly</th>
                <th className="border-b py-2">Total Calls Monthly</th>
              </tr>
            </thead>
            <tbody>
              {data?.mostCalls && data.mostCalls.length > 0 ? (
                data.mostCalls.map((call:any) => (
                  <tr key={call._id}>
                    <td className="border-b py-2">{call.apiName}</td>
                    <td className="border-b py-2">{call.lastCallResponseTime}</td>
                    <td className="border-b py-2">{call.totalCallsDaily}</td>
                    <td className="border-b py-2">{call.totalCallsWeekly}</td>
                    <td className="border-b py-2">{call.totalCallsMonthly}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border-b py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Most Response Time Table */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Most Response Time</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">API Name</th>
                <th className="border-b py-2">Last Call Response Time (ms)</th>
                <th className="border-b py-2">Avg Response Time Daily (ms)</th>
                <th className="border-b py-2">Min Response Time Daily (ms)</th>
                <th className="border-b py-2">Max Response Time Daily (ms)</th>
              </tr>
            </thead>
            <tbody>
              {data?.mostResponseTime && data.mostResponseTime.length > 0 ? (
                data.mostResponseTime.map((response:any) => (
                  <tr key={response._id}>
                    <td className="border-b py-2">{response.apiName}</td>
                    <td className="border-b py-2">{response.lastCallResponseTime}</td>
                    <td className="border-b py-2">{response.avgResponseTimeDaily}</td>
                    <td className="border-b py-2">{response.minResponseTimeDaily}</td>
                    <td className="border-b py-2">{response.maxResponseTimeDaily}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border-b py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home