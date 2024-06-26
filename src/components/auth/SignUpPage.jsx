// Create a signup form component with tailwind css

import { Button, Input, Link } from "@nextui-org/react";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDocument } from "../../database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await createUserWithEmailAndPassword(auth, email, password);
      await setDocument("/shared", email, { projects: [] });
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-4 mt-48  "
      >
        <h1 className="text-4xl font-semibold">Sign Up</h1>
        <div className="text-gray-300 ">
          Already have an account ? <Link href="/login">Login here</Link>
        </div>
        <Input isClearable name="email" type="email" label="Email" />
        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          required
          className=""
        />
        <Button size="lg" color="primary" type="submit">
          Sign Up
        </Button>
        {errorMessage && (
          <span className="text-red-500 mt-4 text-sm">{errorMessage}</span>
        )}
      </form>
    </div>
  );
}

export default SignUp;
