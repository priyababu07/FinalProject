import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './production.css'
const ProductionChart = ({ productionData }) => {
  return (

    <div className="centered-container">
      <h1>Production Comparison</h1>
      <LineChart width={600} height={300} data={productionData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="manual_production" stroke="#8884d8" />
      <Line type="monotone" dataKey="automatic_production" stroke="#82ca9d" />
    </LineChart>
    </div>
  );
};

export default ProductionChart;
