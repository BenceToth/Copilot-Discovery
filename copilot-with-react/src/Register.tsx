import React from 'react';

const Register = () => {
    return (
        <div>
            <h1>Register Page</h1>
            <form>
                <input type="text" name="fullName" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
                <input type="tel" name="phone" placeholder="Phone Number" />
                <input type="date" name="dob" />
                <div>
                    <label>
                        <input type="radio" name="gender" value="male" /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" /> Female
                    </label>
                    <label>
                        <input type="radio" name="gender" value="other" /> Other
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;