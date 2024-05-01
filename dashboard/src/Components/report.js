import React, { useState, useEffect } from 'react';

const MonthlyUsageReport = () => {
  const [usageData, setUsageData] = useState([]);

  const fetchUsageData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/monthly-usage-report/');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      console.log(data)
      setUsageData(data);  // Ensure data is set once
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Slot,Machine ID,Power\n"  // CSV header
      + usageData.map(item => `${item.currentSlot},${item.machine_id},${item.power}`).join('\n');

    const encodedUri = encodeURI(csvContent);  // Encode the CSV content
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'monthly_usage_report.csv');  // Name the CSV file
    document.body.appendChild(link);  // Append to DOM
    link.click();  // Trigger the download
    document.body.removeChild(link);  // Clean up after download
  };

  useEffect(() => {
    fetchUsageData();  // Fetch data once when component mounts
  }, []);  // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <h2>Monthly Usage Report</h2>
      <table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Machine ID</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>
          {usageData.map((item, index) => (
            <tr key={index}>
              <td>{item.currentSlot}</td>
              <td>{item.machine_id}</td>
              <td>{item.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadCSV}>Download as CSV</button>  
    </div>
  );
};

export default MonthlyUsageReport;
