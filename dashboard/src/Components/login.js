import React, { useState } from "react";
import * as Components from  './loginstyle'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(true);
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState(""); // Added state variable for name
    const navigate = useNavigate();
    
    const handleSignInClick = () => {
        setSignIn(true);
        setSignUp(false);
    };

    const handleSignUpClick = () => {
        setSignIn(false);
        setSignUp(true);
    };
    const handleSignInSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // const formData = { email, password }; // Construct form data
        try {
            const response = await fetch('http://localhost:8000/api/signin/', {
              method: 'POST', // Correct HTTP method
              headers: {
                'Content-Type': 'application/json', // Indicate JSON content
              },
              body: JSON.stringify({ email, password }), // Correctly structure data in POST body
            });
        
           
            const data = await response.json();
            console.log('Data:', data);
            console.log('Success:', data.success);
            if (data.success) {
                console.log('User signed in successfully');
                // Redirect to dashboard upon successful sign-in
                navigate('/dashboard');
            } else {
                console.error('Sign-in failed:', data.error_message);
            }
        } catch (error) {
            console.error('Error occurred while signing in:', error);
        }
    };

//     const handleSignInSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         // const formData = { email, password }; // Construct form data
//         try {
//             const response = await fetch(`http://localhost:8000/api/signin/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
// });
//             const data = await response.json();
//             if (data.success) {
//                 console.log('User signed in successfully');
//             } else {
//                 console.error('Sign-in failed:', data.error_message);
//             }
//         } catch (error) {
//             console.error('Error occurred while signing in:', error);
//         }
//     };
    const handleSignUpSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formData = { name, email, password }; // Construct form data
    
        // Validate form fields
        if (!name || !email || !password) {
            console.error('Please fill out all fields.');
            return;
        }
    
        // Additional validation (e.g., email format, password strength) can be added here
    
        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                console.log('User signed up successfully');
            } else {
                console.error('Sign-up failed:', data.message);
            }
        } catch (error) {
            console.error('Error occurred while signing up:', error);
        }
    };
    

    return (
        <Components.Container>
            {signIn && (
                <Components.SignInContainer>
                    <Components.Form onSubmit={handleSignInSubmit}>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input type='email' id='emailSignIn' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Components.Input type='password' id='passwordSignIn' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Components.Button type="submit">Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>
            )}

            {signUp && (
                <Components.SignUpContainer>
                    <Components.Form onSubmit={handleSignUpSubmit}>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type='text' id='nameSignUp' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <Components.Input type='email' id='emailSignUp' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Components.Input type='password' id='passwordSignUp' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Components.Button type="submit">Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>
            )}

            <Components.OverlayContainer>
                <Components.Overlay>
                    <Components.LeftOverlayPanel>
                        <Components.Title>Fulmine</Components.Title>
                        <Components.Paragraph>
                        Start journey with us 
                        </Components.Paragraph>
                        <Components.GhostButton onClick={handleSignInClick}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel>
                        <Components.Title>Fulmine</Components.Title>
                        <Components.Paragraph>
                            Start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={handleSignUpClick}>
                            Sign Up
                        </Components.GhostButton> 
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    )
}

export default Login;