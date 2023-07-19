/* 
Password's length should be between 6 and 32 characters.
Strength of the password is a combination of its length and the type of characters in the password.
The max strength possible is 10.
If the password has at least one uppercase letter then strength increases by 1.
If the password has at least one lowercase letter then strength increases by 1.
If the password has at least one digit then strength increases by 1.
If the password has at least one special character then strength increases by 1.
If strength > 3 && strength <= 6 then password is considered to be weak.
If strength > 6 && strength <= 8 then password is considered to be moderate.
If strength > 8 then the password is considered to be strong.
If the password length is less than 3 then strength should be considered as 0.
*/

import "./App.css";
import { useEffect, useState } from "react";
import { hasNumber, hasLowerCase, hasSpecialChar, hasUpperCase } from "./Utils";

function App() {
  const [password, setPassword] = useState("");
  const [label, setLabel] = useState("Very Weak");
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: "100%",
    backgroundColor: "red",
  });
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // strength= strength+characterType
  // total strength =10
  //'aA@0'
  // 0>1>2>3>4(max)
  // max strength by length = 10-4=>6

  useEffect(() => {
    const updatedProgressBarStyles = {
      backgroundColor: "red",
    };

    let totalStrength = 0;
    if (password.length > 3) {
      const strenghtByLength = Math.min(6, Math.floor(password.length / 3)); // Max can be 6 and dividing by 3 cause length less than 3 is weak
      let strengthByCharacterType = 0;

      if (hasNumber.test(password)) {
        strengthByCharacterType += 1;
      }
      if (hasSpecialChar.test(password)) {
        strengthByCharacterType += 1;
      }
      if (hasUpperCase.test(password)) {
        strengthByCharacterType += 1;
      }
      if (hasLowerCase.test(password)) {
        strengthByCharacterType += 1;
      }
      totalStrength = strenghtByLength + strengthByCharacterType;
    } else {
      totalStrength = 0;
    }

    updatedProgressBarStyles.width = `${totalStrength * 10}%`; //if totalStrength=3, width = 30%
    console.log(updatedProgressBarStyles);

    if (totalStrength === 10) {
      updatedProgressBarStyles.backgroundColor = "green";
      setLabel("Very Strong");
    } else if (totalStrength >= 6) {
      updatedProgressBarStyles.backgroundColor = "green";
      setLabel("Strong");
    } else if (totalStrength >= 4) {
      updatedProgressBarStyles.backgroundColor = "orange";
      setLabel("Medium");
    } else if (totalStrength <= 3) {
      updatedProgressBarStyles.backgroundColor = "red";
    }
    // setStrength(totalStrength);
    setProgressBarStyles(updatedProgressBarStyles);
  }, [password]);

  return (
    <>
      <div className="app">
        <h1>Password Strength Checker</h1>
        <input type="text" value={password} onChange={handleChangePassword} />
        <div className="progress-container">
          <div className="progress-bar" style={{ ...progressBarStyles }} />
        </div>
        <p>
          <strong>{label}</strong>
        </p>
      </div>
    </>
  );
}

export default App;
