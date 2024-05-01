import React, { useState } from 'react';
import './MonthlyPage.css'; // Import CSS file for styling
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MonthlyPage = () => {
  const [usage, setUsage] = useState(0);
  const [rate, setRate] = useState(0);
  const [bill, setBill] = useState(0);

  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const calculateBill = () => {
    const calculatedBill = usage * rate;
    setBill(calculatedBill);
  };

  // Sample data for the line graph
  const data = [
    { name: 'Day 1', power_consumption: 100 },
    { name: 'Day 2', power_consumption: 150 },
    { name: 'Day 3', power_consumption: 200 },
    // Add more data as needed
  ];

  // Sample machines data for display
  const machines = [
    { name: 'Machine 1', base_power_consumption: 50 },
    { name: 'Machine 2', base_power_consumption: 75 },
    // Add more machines as needed
  ];

  return (
    <div className="monthly-page">
      <div className='charts'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="power_consumption" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="calculator-container">
        <h2>Monthly Current Rate Calculator</h2>
        <div>
          <label>
            Usage (kWh):
            <input type="number" value={usage} onChange={handleUsageChange} />
          </label>
        </div>
        <div>
          <label>
            Rate (₹/kWh):
            <input type="number" value={rate} onChange={handleRateChange} />
          </label>
        </div>
        <button onClick={calculateBill}>Calculate Bill</button>
        <div>
          <h3>Calculated Bill: ₹{bill}</h3>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPage;
