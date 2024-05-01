import React, { useState, useEffect } from 'react';

function SettingsPage({ toggleTheme }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    toggleTheme(); // Apply the theme change across all pages
  };

  const toggleThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`settings-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <h2>Settings</h2>
      <div className="settings-form">
        <label>
          Dark Theme:
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={toggleThemeHandler}
          />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default SettingsPage;
