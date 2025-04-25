import React from "react";

function Register() {
  // two state items, username and mobile
  const [username, setUsername] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  // two state items for username and mobile error
  const [usernameError, setUsernameError] = React.useState("");
  const [mobileError, setMobileError] = React.useState("");

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);

              // validate username, must be at least 8 characters long, must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
              const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              if (!regex.test(value)) {
                setUsernameError("Invalid username");
              } else {
                setUsernameError("");
              }
            }}
          />
          {usernameError && (
            <p
              style={{
                color: "red",
              }}
            >
              {usernameError}
            </p>
          )}
        </label>
        <label>
          UK Mobile Number:
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              setMobile(value);

              // validate UK mobile number, must start with 07 and be 11 characters long
              const regex = /^07\d{9}$/;
              if (!regex.test(value)) {
                setMobileError("Invalid mobile number");
              } else {
                setMobileError("");
              }
            }}
          />
          {mobileError && (
            <p
              style={{
                color: "red",
              }}
            >
              {mobileError}
            </p>
          )}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Register;
