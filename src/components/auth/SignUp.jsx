// Create a signup form component with tailwind css

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await createUserWithEmailAndPassword(auth, email, password);
      
      toast.success("Account created successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      toast.error(errorMessage);
    }
  };

  return (
<>
  <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Enter your email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Enter your password"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Sign up
    </button>
    {errorMessage && (
      <span className="text-red-500 mt-4 text-sm">{errorMessage}</span>
    )}
  </form>
</>
  );
}

export default SignUp;
