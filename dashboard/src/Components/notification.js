// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Axios for making API requests
// import { FaBell } from 'react-icons/fa'; // Bell icon for notifications
// import './notification.css'; // Link to the CSS file for styling

// // Notification component to display messages
// const Notification = ({ message, onClose }) => (
//   <div className="notification">
//     <p>{message}</p> {/* Notification message */}
//     <button onClick={onClose}>Close</button> {/* Button to close the notification */}
//   </div>
// );score 3 module

// // Main component with logic to fetch data and trigger notifications
// const MaintenanceNotification = () => {
//   const [currentSlot, setCurrentSlot] = useState('t1'); // State to hold the current time slot
//   const [notification, setNotification] = useState(null); // State to hold notification message

//   useEffect(() => {
//     const fetchCurrentSlot = async () => {
//       try {
//         const response = await axios.get('/api/current-slot'); // Fetch current slot from backend
//         const slot = response.data; // Assume the backend returns the current slot (e.g., 't1', 't2', or 't3')

//         setCurrentSlot(slot); // Update the current slot

//         if (slot === 't2' || slot === 't3') {
//           setNotification('System can be set for maintenance'); // Trigger notification for t2 or t3
//         } else {
//           setNotification(null); // Clear the notification if not t2 or t3
//         }
//       } catch (error) {
//         console.error('Error fetching current slot:', error); // Log errors if any
//       }
//     };

//     fetchCurrentSlot(); // Fetch data when component mounts
//   }, []); // Run only once on component mount

//   const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to track if notification is open

//   return (
//     <div className="notification-container"> {/* Main container */}
//       <h1>Maintenance Notification</h1> {/* Page title */}
      
//       {/* Notification icon with a badge when there's a notification */}
//       <div className="notification-icon" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
//         <FaBell /> {/* Bell icon */}
//         {notification && <span className="notification-badge">1</span>} {/* Badge indicating notification */}
//       </div>

//       {isNotificationOpen && notification && (
//         <Notification
//           message={notification}
//           onClose={() => setIsNotificationOpen(false)} // Clear notification when closed
//         />
//       )}
//     </div>
//   );
// };

// export default MaintenanceNotification;
import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa'; // Bell icon for notifications
import './notification.css'; // CSS for styling

// Notification component to display messages
const Notification = ({ message, onClose }) => (
  <div className="notification">
    <p>{message}</p> {/* Display the message */}
    <button onClick={onClose}>Close</button> {/* Close button */}
  </div>
);

// Main component for maintenance notifications
const MaintenanceNotification = () => {
  const [notification, setNotification] = useState(null); // State to hold notification message
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to control visibility

  useEffect(() => {
    // Simulate fetching the current slot, set notification accordingly
    const currentSlot = 't2'; // For example, this could come from an API or a state manager

    if (currentSlot === 't2' || currentSlot === 't3') {
      setNotification('System can be set for maintenance'); // Set the notification message
    }
  }, []); // This effect runs once on component mount

  return (
    <div className="notification-container">
      <h1>Maintenance Notification</h1> {/* Page title */}

      {/* Notification icon with a badge */}
      <div
        className="notification-icon"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle visibility
      >
        <FaBell />
        {notification && <span className="notification-badge">1</span>} {/* Badge indicating notification */}
      </div>

      {/* Conditionally render the notification */}
      {isNotificationOpen && notification && (
        <Notification
          message={notification} // Pass the message
          onClose={() => setIsNotificationOpen(false)} // Close handler
        />
      )}
    </div>
  );
};

export default MaintenanceNotification;
