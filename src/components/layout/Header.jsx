import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import Icon from "../shared/Icon";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthState();

  return (
    <nav className="flex items-center justify-between h-16 px-4">
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
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color={"secondary"}
                  variant={"flat"}
                  className="capitalize"
                >
                  <Icon name="user" size={16} />
                  {user?.email}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown Variants"
                color={"primary"}
                variant={"faded"}
              >
                <DropdownItem
                  key="dashboard"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={logout}
                  className="text-danger"
                  color="danger"
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
