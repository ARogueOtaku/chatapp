import { useEffect, useState, useCallback } from "react";
import appwriteApi from "../utils/appwriteApi";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState("");

  const fetchCurrentUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const currentUser = await appwriteApi.getAccount();
      setUser(currentUser);
      setUserError("");
    } catch (e) {
      console.log(e.message);
      setUser(null);
    }
    setUserLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setUserLoading(true);
    try {
      await appwriteApi.createSession(email, password);
      const currentUser = await appwriteApi.getAccount();
      setUser(currentUser);
      setUserError("");
    } catch (e) {
      console.log(e.message);
      setUserError(e.message);
      setUser(null);
    }
    setUserLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setUserLoading(true);
    try {
      await appwriteApi.deleteCurrentSession();
      setUser(null);
      setUserError("");
    } catch (e) {
      setUserError(e.message);
    }
    setUserLoading(false);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return [user, userLoading, userError, login, logout];
};

export default useUser;
