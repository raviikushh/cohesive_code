import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" required placeholder="Enter email" />
      <input
        type="password"
        name="password"
        required
        placeholder="Enter password"
      />
      <button className="bg-blue-500" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
