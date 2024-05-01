import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Star icon for feedback/rating
import './profile.css'; // Link to the CSS file for styling
import axios from 'axios';
const Profile = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false); // Track password change form visibility
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // Track feedback form visibility
  const navigate = useNavigate(); // For navigation (e.g., log out)

  const toggleChangePassword = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
  };

  const toggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    // Handle password change logic here
    // Assuming axios is set up to communicate with a backend API
    try {
      await axios.post('/api/change-password', {
        currentPassword,
        newPassword,
      });

      setPasswordError('');
      alert('Password changed successfully!');
      setIsChangePasswordVisible(false); // Hide the change password form
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  const logOut = () => {
    // Add your log-out logic here
    console.log('User logged out');
    navigate('/'); // Redirect to home page after log out
  };

  const handleFeedback = (rating) => {
    console.log('User feedback:', rating); // Handle user feedback
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* User Information */}
      <div className="user-info">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>

      {/* Change Password Section */}
      <div className="change-password-section">
        <button onClick={toggleChangePassword}>
          Change Password
        </button>

        {isChangePasswordVisible && (
          <div className="change-password">
            <form onSubmit={handlePasswordChange}>
              <div>
                <label>Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <button onClick={toggleFeedback}>
          Provide Feedback
        </button>

        {isFeedbackVisible && (
          <div className="feedback">
            <h2>Rate Your Experience</h2>
            <StarRating onRating={handleFeedback} />
          </div>
        )}
      </div>

      {/* Log Out Button */}
      <div className="log-out">
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

// Star Rating Component
const StarRating = ({ onRating }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                if (onRating) {
                  onRating(ratingValue); // Notify parent component
                }
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Profile;
