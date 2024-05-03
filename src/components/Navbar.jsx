import useAuthState from "../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthState();
  function handleClick() {
    navigate("/");
  }

  
  return (
    <div className="bg-gray-700 text-white h-16 flex items-center justify-between px-4 sticky top-0 z-10">
  <h2 className="font-bold text-xl cursor-pointer" onClick={handleClick}>Cohesive Code</h2>
  <div className="flex items-center gap-4">
    {user === null ? (
      <>
        <a
          href="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Login
        </a>
        <a
          href="/signup"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Signup
        </a>
      </>
    ) : (
      <>
        <div className="mr-4">{user.email}</div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </>
    )}
  </div>
</div>
  );
}

export default Navbar;
