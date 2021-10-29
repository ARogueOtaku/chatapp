import { useEffect, useState, useCallback } from "react";
import appwriteApi from "../utils/appwriteApi";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const currentUser = await appwriteApi.getAccount();
      setUser(currentUser);
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
    } catch (e) {
      console.log(e.message);
      setUser(null);
      setUserLoading(false);
      throw e;
    }
    setUserLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setUserLoading(true);
    await appwriteApi.deleteCurrentSession();
    setUser(null);
    setUserLoading(false);
  }, []);

  const signup = useCallback(async (email, password, name) => {
    setUserLoading(true);
    try {
      await appwriteApi.createAccount(email, password, name);
      await appwriteApi.createSession(email, password);
      await appwriteApi.sendVerificationEmail();
      const currentUser = await appwriteApi.getAccount();
      setUser(currentUser);
    } catch (e) {
      console.log(e.message);
      setUser(null);
      setUserLoading(false);
      throw e;
    }
    setUserLoading(false);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const verify = useCallback(async (userid, secret) => {
    await appwriteApi.verifyUser(userid, secret);
  }, []);

  return [user, userLoading, login, logout, signup, verify];
};

export default useUser;
