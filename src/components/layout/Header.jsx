import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import Icon from "../shared/Icon";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthState();

  return (
    <nav className="flex container mx-auto items-center justify-between h-16">
      <div
        onClick={() => navigate("/")}
        className="font-semibold flex gap-2.5 uppercase group items-center text-primary-400 hover:text-secondary-400 cursor-pointer text-xl  "
      >
        <Icon
          strokeWidth={3}
          name="code"
          className="group-hover:rotate-90 duration-500 ease-in-out"
        />{" "}
        Cohesive Code
      </div>

      <div className="flex gap-4">
        {user === null ? (
          <>
            <Button color="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate("/signup")}
              href="/signup"
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/dashboard")} variant="solid">
              <Icon name="layout-dashboard" size={16} />
              Dashboard
            </Button>
            <Button color="primary" onClick={logout}>
              Logout
              <Icon name="log-out" size={16} />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
