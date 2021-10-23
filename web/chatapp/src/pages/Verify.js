import { useCallback, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import UserContext from "../contexts/UserContext";

const Verify = () => {
  const [done, setDone] = useState(false);
  const { verify } = useContext(UserContext);

  const verifyEmail = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const secret = urlParams.get("secret");
      await verify(userId, secret);
    } catch (e) {
      console.log(e.message);
    }
    setDone(true);
  }, [verify]);

  useEffect(verifyEmail, [verifyEmail]);
  return done ? <Redirect to="/" /> : "Verifying";
};

export default Verify;
