// Appearance.js

// Appearance.js
import React, { useState } from 'react';


const Appearance = () => {
  const [backgroundColor, setBackgroundColor] = useState('#f4f4f4');
  const [textColor, setTextColor] = useState('#333');

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
  };

  return (
    <div className="main-content appearance-content">
      <h2>Appearance Page</h2>
      <div className="color-picker">
        <label>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
        />
      </div>
      <div className="color-picker">
        <label>Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => handleTextColorChange(e.target.value)}
        />
      </div>
      {/* Additional customization options can be added */}
    </div>
  );
};

export default Appearance;


