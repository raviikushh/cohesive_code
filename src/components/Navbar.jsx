import useAuthState from "../pages/useAuthState";

function Navbar() {
  const { user, logout } = useAuthState();

  return (
    <div className="h-16 flex items-center justify-between px-4">
      <h2>Cohesive Code</h2>

      <div className="flex gap-2">
        {user === null ? (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        ) : (
          <>
            <div>{user.email}</div>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
