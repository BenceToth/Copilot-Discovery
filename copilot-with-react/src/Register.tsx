import React from 'react';

const Register = () => {
    // two state items, username and mobile
    const[username, setUsername] = React.useState('');
    const[mobile, setMobile] = React.useState('');
    // two state items, username and mobile error
    const[usernameError, setUsernameError] = React.useState('');
    const[mobileError, setMobileError] = React.useState('');
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username
                    <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={(e) => {
                        const value = e.target.value; 
                        setUsername(value);
                        // validate username: must be 8 characters long, must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                        if (!regex.test(value)) {
                            setUsernameError("Invalid Username");
                        } else {
                            setUsernameError("");
                        }
                    }}
                    />
                    {usernameError && <span style={{color: 'red'}}>{usernameError}</span>}
                </label>
                <label>
                    UK Mobile Number
                    <input type="tel" name="mobile"
                        value={mobile} 
                        onChange={(e) => {
                            const value = e.target.value;
                            setMobile(value);
                            // validate mobile number: must be 11 digits long, must start with 07
                            const regex = /^07\d{9}$/;
                            if (!regex.test(value)) {
                                setMobileError("Invalid Mobile Number");
                            } else {
                                setMobileError("");
                            }
                        }}
                    />
                    {mobileError && <span style={{color: 'red'}}>{mobileError}</span>}
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;