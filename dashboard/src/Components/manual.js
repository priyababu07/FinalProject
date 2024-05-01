import React from 'react';
import './automatic.css'; // Link to the CSS file for styling


// Initial machine data
const initialMachineData = [
  {
    id: 1,
    name: 'Machine A',
    timeSlots: [
      '9:00 AM - 10:00 AM',
      '1:00 PM - 2:00 PM',
      '3:00 PM - 4:00 PM',
    ],
  },
  {
    id: 2,
    name: 'Machine B',
    timeSlots: [
      '10:00 AM - 11:00 AM',
      '2:00 PM - 3:00 PM',
      '4:00 PM - 5:00 PM',
    ],
  },
  {
    id: 3,
    name: 'Machine C',
    timeSlots: [
      '11:00 AM - 12:00 PM',
      '3:00 PM - 4:00 PM',
      '5:00 PM - 6:00 PM',
    ],
  },
];

// Machine schedule component with card layout
const MachineSchedule = ({ machines }) => (
  
  <div className="machine-schedule">
  
<h1>Manuale Schedule</h1> 
    {machines.map((machine) => (
      <div key={machine.id} className="machine-card"> {/* Card for each machine */}
        <h2>{machine.name}</h2> {/* Machine name */}
        <ul className="time-slot-list">
          {machine.timeSlots.map((slot, index) => (
            <li key={index} className="time-slot"> {/* Individual time slots */}
              <span>{slot}</span> {/* Display time slot */}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// Main component with container
const Manual = () => (
  <div > {/* Container for the whole component */}
    <MachineSchedule machines={initialMachineData} />
  </div>
);

export default Manual;
