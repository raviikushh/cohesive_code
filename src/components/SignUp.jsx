// Create a signup form component with tailwind css

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" required placeholder="Enter email" />
        <input
          type="password"
          name="password"
          required
          placeholder="Enter password"
        />
        <button className="bg-blue-500" type="submit">
          Sign up
        </button>
        <span className="text-red-500">{errorMessage}</span>
      </form>
    </>
  );
}

export default SignUp;
