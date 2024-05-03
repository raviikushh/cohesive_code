import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAuthState() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const listener = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return () => {
      listener();
    };
  }, []);

  return { user, isLoading, error, logout };
}

export default useAuthState;
