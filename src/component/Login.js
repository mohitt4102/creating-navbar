import React, { useState } from "react";
import { toast } from "react-toastify";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Email is required.";
    if (email) {
      tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
        ? ""
        : "Email is not valid.";
    }
    tempErrors.password = password ? "" : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Login successful:', data);
        toast.success("Login successful!");
  
        // Handle login success (e.g., redirecting to a dashboard)
      } catch (error) {
        console.error('Error in login:', error);
        toast.error("Login failed: " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="px-12 py-10 mt-4 text-left bg-neutral-800 rounded shadow-lg">
        <h3 className="text-2xl font-bold text-white text-center pb-4">
          Login to your account
        </h3>
        <form   onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-white" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-red-600 focus:ring-red-600"
                    : "focus:ring-cyan-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-xs text-red-600">{errors.email}</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-600 focus:ring-red-600"
                    : "focus:ring-cyan-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-xs text-red-600">{errors.password}</span>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-4 py-1 mt-8 text-lg text-white bg-gray-500 rounded-lg hover:bg-cyan-500">
                Login
              </button>
              <a href="null" className="text-sm text-cyan-500 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
