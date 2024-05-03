import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Input, Link } from "@nextui-org/react";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full flex flex-col gap-4 mt-48"
      >
        <h1 className="text-4xl font-semibold">Login</h1>
        <div className="text-gray-300 ">
          New to cohesive code ? <Link href="/signup">Sign up here</Link>
        </div>
        <Input isClearable name="email" type="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Button size="lg" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
