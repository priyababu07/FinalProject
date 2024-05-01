import './service.css'; // Import your CSS file for styling
import { useState } from 'react';

const smallImage = 'path_to_your_small_image.png'; // Provide correct path to your small image

const ServicesPage = () => {
  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      details: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // You can add further logic here, like sending the form data to a server
    };

    return (
      <div className="contact-form-container">
        <div className="contact-us">
          <img src={smallImage} alt="" className="small-image" />
          
        </div>
        <form onSubmit={handleSubmit}>
          {/* Rest of your form */}
        </form>
        
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Our Services</h1>
      <div className="services-container">
        <div className="service-card">

          <h2>Cost Saving</h2>
          <p>
            Our approach to energy <br></br> management helps<br></br> industries to save on <br></br>electricity costs through<br></br> effective energy <br></br>distribution,reducing <br></br>overall energy <br></br>consumption and <br></br>maximized efficiency.
          </p>
        </div>

        <div className="service-card">
          <h2>Operational Performance</h2>
          <p>
            By optimizing energy<br></br> distribution and <br></br>consumption,the project<br></br>aims to enhance <br></br>operational performance<br></br>in industries,improve <br></br>efficiency and reduce <br></br>downtime.
          </p>
        </div>

        <div className="service-card">
          <h2>Practical Energy Management</h2>
          <p>
            The project aims to <br></br>provide practical <br></br>solutions to enhance<br></br>energy management that <br></br>are accessible to a wide<br></br>range of industries.
          </p>
        </div>
      </div>
      <ContactForm /> {/* Rendering ContactForm component */}
    </div>
  );
};

export default ServicesPage;