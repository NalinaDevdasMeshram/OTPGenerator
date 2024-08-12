import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [phonenumber, setPhonenumber] = useState("");
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const mobilenopattern = /^[0-9]{10}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phonenumber || !mobilenopattern.test(phonenumber)) {
      alert("please enter the validate number");
      return "";
    }
  };
  const handleotpsend = (e) => {
    e.preventDefault();
    if (!phonenumber || !mobilenopattern.test(phonenumber)) {
      alert("please enter the validate number");
      return "";
    }
    setOtp(generateOTP().split(""));
  };
  const handlechange = (i, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newotp = [...otp];
    newotp[i] = value.substring(value.length - 1);
    setOtp(newotp);
    // move to next input box if the current one  is filled
    if (value && i < inputRef.current.length - 1) {
      inputRef.current[i + 1].focus();
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "30px" }}>
        Enter Mobile Number
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input
            type="phone"
            placeholder="Enter Phone Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <button className="btn" onClick={handleotpsend}>
            Send OTP
          </button>
        </div>
        <h1 style={{ margin: "35px" }}>Enter OTP</h1>
        <div className="otparea">
          {otp.map((item, i) => (
            <input
              type="text"
              key={i}
              ref={(input) => (inputRef.current[i] = input)}
              value={item}
              maxLength={1}
              onChange={(e) => handlechange(i, e)}
            />
          ))}
        </div>
      </form>
      <button type="submit" className="btntext">
        submit
      </button>
    </div>
  );
}

export default App;
