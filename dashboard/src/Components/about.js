import React from 'react';
import './about.css';
import myImage1 from '../Assets/Rectangle6.png';
import myImage2 from '../Assets/Rectangle5.png';
// import { useState } from 'react';
const About = () => {
    // const [backgroundColor, setBackgroundColor] = useState('#788db9'); 
    
    // const changeBackgroundColor = (color) => {
    //     setBackgroundColor(color);
    

    return(
        <div className='about-page' >
            <img src={myImage1} alt="cloud" className='clo-container' />
            <img src={myImage1} alt="cloud" className='cl-container' />
            
            <h1>About Us</h1>
            
            <p>Welcome to our solution! We believe that managing <br/> energy consumption should be easy and efficient,  <br/> which is why we've created a simple and attractive  <br/> system that optimizes the use of energy resources in  <br/> an industry. Through a sophisticated combination of <br/> machine learning and optimization algorithms, Fulmine <br/> dynamically tailors machine operation schedules to minimize <br/> overall electricity consumption.At Fulmine, we envision a future <br/> where manufacturing operations seamlessly integrate cutting-edge <br/> technologies to achieve unparalleled efficiency in electricity usage.</p>
            <img src={myImage2} alt='industry' className='industry' />
             
        </div>
    )
};
export default About;