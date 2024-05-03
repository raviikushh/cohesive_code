import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthState();

  return (
    <header className="h-12 ">
      <nav className="flex items-center justify-between py-4 px-6">
        <div className="font-medium uppercase ">Cohesive Code</div>

        <div className="flex gap-4">
          {user === null ? (
            <>
              <Button color="primary" onClick={() => navigate("/login")}>Login</Button>
              <Button color="secondary" onClick={() => navigate("/signup")} href="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
