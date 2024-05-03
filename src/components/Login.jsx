import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const[error, setError] = useState(null);
  const handleLogin = async (e) => {
    
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
      toast.success('Logged in successfully');
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Invalid credentials");
    }
  };
  return (
<form onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
  <div className="flex items-center justify-between">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Login
    </button>
    {<div className="text-red-500 ml-4">{error}</div>}
  </div>
</form>
  );
}

export default Login;
