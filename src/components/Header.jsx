import useAuthState from "../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { Button , Link} from "@nextui-org/react";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthState();

  return (
    <header className="h-16 ">
      <nav className="flex items-center justify-between py-4 px-6">
      <Link href="/"><div className="font-medium uppercase cursor-pointer" >Cohesive Code</div></Link>  

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
              <Button color="primary" onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
