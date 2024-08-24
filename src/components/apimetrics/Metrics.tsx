import React, { useState, useEffect } from 'react';
import apiMetrics from './MetricsApi';

const Metrics: React.FC = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(15);
  const [sort, setSort] = useState('updatedAt');

  useEffect(() => {
    const fetchData = async (page: number, sort: string, limit: number) => {
      let response = await apiMetrics.metricsApi({ page: page, sortBy: sort, limit: limit });
      if (response?.data) {
        setData(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
      }
    };

    fetchData(currentPage, sort, limit);
    
    const intervalId = setInterval(() => {
      fetchData(currentPage, sort, limit);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, sort, limit]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setCurrentPage(1); // Reset to the first page when sort order changes
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="limit" className="mr-2 text-sm font-medium text-gray-700">Limit:</label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="updatedAt">Latest Updated</option>
            <option value="totalCallsDaily">Most Calls</option>
            <option value="lastCallResponseTime">Response Time</option>
          </select>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ApiName
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ResponseTime
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AvgResponseTime
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MinResponseTime
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MaxResponseTime
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TotalCalls
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((item: any) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.apiName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastCallResponseTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgResponseTimeDaily}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.minResponseTimeDaily}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.maxResponseTimeDaily}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalCallsDaily}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 bg-gray-300 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 bg-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Metrics;
