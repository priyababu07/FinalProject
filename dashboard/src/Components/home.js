import React, { useState, useEffect } from 'react';
import { FaCogs, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import MonthlyBillCalculator from './MonthlyConsumption';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Calendar from 'react-calendar';


function Home() {
  const [date, setDate] = useState(new Date());
  const [machineData, setMachineData] = useState([]);
  const [machines,setmachines] = useState([]);
  useEffect(() => {
    async function getGraphData(){
      try {
        const machineData = await axios.get("http://127.0.0.1:8000/api/ret/")
        console.log("machineDatadata")
        console.log(machineData.data)
        setMachineData(machineData.data)
      } catch (error) {
        console.log(error)
      }
    }
    getGraphData()

    async function schedule(){
      try {
        const machines = await axios.get("http://127.0.0.1:8000/api/machines/")
        console.log("hello")
        console.log(machines.data)
        setmachines(machines.data)
      } catch (error) {
        console.log(error)
      }
    }
    schedule()
  }, []); 

 


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h4>TOTAL NUMBER OF MACHINES:</h4>
            <FaCogs className='card_icon' />
          </div>
          <h4>Assigned:</h4>
          <div className='small-card'>
            <h4 className='small-inner'>Unassigned Machine:</h4>
          </div>
       </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>WARNING</h3>
            <FaExclamationTriangle className='card_icon' />
          </div>
          <div className='small-card'>
            <h4 className='war-inner'>Message</h4>
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Time</h3>
            <p>{date.toLocaleString()}</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>Calender</h3>
            <FaCalendarAlt className='card_icon' />
          </div>
          <Calendar onChange={(newDate) => setDate(newDate)} value={date} className='custom-calendar'/>
        </div>
      </div>

      
      <div className='charts'>
  <ResponsiveContainer width='100%' height='100%'>
    {machineData && machineData.length > 0 ? (
      <BarChart
        width={500}
        height={300}
        data={machineData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='power_consumption' fill='#8884d8' />
      </BarChart>
    ) : (
      <p>Loading data...</p>
    )}
  </ResponsiveContainer>



        <div className='chart-card'>
    <div className='card'>
      <div className='card-inner'>
        <h3>SCHEDULE  FOR  MACHINE:</h3>
        <br></br>
        <ul>  {
       machines.map((machine, i)=>{
         return (
           <li key={i}>{machine.name}: {machine.base_power_consumption}</li>
         )
       })
     }</ul>
      
      </div>
     
    </div>
  </div>
      </div>
    </main>
  );
}

export default Home;
