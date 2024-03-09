import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    tempErrors.confirmPassword =
      confirmPassword === password ? "" : "Passwords do not match.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration form submitted:", { email, password });

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful:', data);
          // Handle successful registration (e.g., redirect to login page)
        } else {
          console.error('Registration failed:', response.status);
          // Handle errors (e.g., show error message to user)
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle network errors (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="px-12 py-10 mt-4 text-left bg-neutral-800 rounded shadow-lg">
        <h3 className="text-2xl font-bold text-white text-center pb-4">
          Register your account
        </h3>
        <form onSubmit={handleSubmit}>
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
            <div className="mt-4">
              <label className="block text-white">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? "border-red-600 focus:ring-red-600"
                    : "focus:ring-cyan-500"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-600">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-4 py-1 mt-8 text-lg text-white bg-gray-500 rounded-lg hover:bg-cyan-500"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
