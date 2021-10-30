import { useCallback, useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import AlertContext from "../contexts/AlertContext";
import UserContext from "../contexts/UserContext";
import { ALERT_TYPES } from "../hooks/useAlert";

const Register = () => {
  const { user, signup, userLoading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(AlertContext);

  const handleSignup = useCallback(async () => {
    try {
      await signup(email, password, name);
    } catch (e) {
      setAlert({ message: e.message, type: ALERT_TYPES.ERROR });
    }
  }, [email, password, name, signup, setAlert]);

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="flex flex-col p-8 bg-white ring-8 ring-gray-400 rounded-lg w-min top-1/2 left-1/2 absolute transform -translate-y-1/2 -translate-x-1/2">
      <div className="flex flex-col my-2.5 mx-8">
        <label htmlFor="name" className="py-2 text-base bg-white text-gray-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-solid border-gray-300 outline-none py-1.5 px-3 text-base w-80 rounded-lg bg-white text-gray-600 placeholder-gray-500"
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col my-2.5 mx-8">
        <label htmlFor="email" className="py-2 text-base bg-white text-gray-600">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-solid border-gray-300 outline-none py-1.5 px-3 text-base w-80 rounded-lg bg-white text-gray-600 placeholder-gray-500"
          placeholder="john.doe@example.com"
        />
      </div>
      <div className="flex flex-col my-2.5 mx-8">
        <label htmlFor="password" className="py-2 text-base bg-white text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-solid border-gray-300 outline-none py-1.5 px-3 text-base w-80 rounded-lg bg-white text-gray-600 placeholder-gray-500"
          placeholder="$omething_$ecure"
        />
      </div>
      <div className="flex flex-col my-2.5 mx-8">
        <input
          type="button"
          name="register"
          className={`border border-solid border-gray-300 outline-none py-1.5 px-3 text-base w-80 rounded-lg bg-gray-800 text-white cursor-pointer ${
            userLoading ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
          value="Register"
          onClick={handleSignup}
        />
      </div>
      <div className="flex flex-col my-2.5 mx-8 justify-center items-center">
        <span className="py-1.5 bg-white text-gray-600">
          Already have an Account?{" "}
          <Link to="/login" className="bg-white text-gray-800 font-bold">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
