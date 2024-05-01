import React, {useState, useRef} from "react";
import './landing.css';
import myImage from '../Assets/Rectangle5.png';
import myImage1 from '../Assets/Rectangle6.png';


const Landing = () => {
    const [backgroundColor, setBackgroundColor] = useState('#171718');
  
    // Remove changeBackgroundColor
    const [showThunder, setShowThunder] = useState(false);
    const cloudRef1 = useRef(null);
    const cloudRef2 = useRef(null);
  
    const handleCloudsCollision = () => {
      const cloud1 = cloudRef1.current;
      const cloud2 = cloudRef2.current;
  
      cloud1.style.transform = 'translateX(-50px)';
      cloud2.style.transform = 'translateX(50px)';
  
      setShowThunder(true);
  
      setTimeout(() => {
        cloud1.style.transform = 'translateX(0)';
        cloud2.style.transform = 'translateX(0)';
        setShowThunder(false);
      }, 1000);
    };
  
    return (
      <div className="page-container" style={{ backgroundColor, minHeight: '100vh' }}>
        <h1 className="text-container">Efficient energy, profitable operations!</h1>
        <button className="custom-button">Join Us</button>
        <img ref={cloudRef1} src={myImage1} alt="cloud" className="cloud-container" onClick={handleCloudsCollision} />
        {showThunder && <div className="thunder"></div>}
        <img ref={cloudRef2} src={myImage1} alt="cloud" className="cloud-container" onClick={handleCloudsCollision} />
        <img src={myImage} alt="bulb" className="bulb-container" />
        
      </div>
    );
  };
  
  export default Landing;
  