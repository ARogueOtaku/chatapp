import useUser from "./hooks/useUser.js";
import Login from "./pages/Login.js";

const App = () => {
  const [user, userLoading, userError, login, logout] = useUser();

  return (
    <>
      {user ? (
        <div>
          <pre>{JSON.stringify(user, null, "\t")}</pre>
          <input type="button" id="logout" value="Logout" onClick={logout} />
        </div>
      ) : (
        <Login login={login} />
      )}
      {userLoading ? <p>User Loading</p> : ""}
      <p>{userError}</p>
    </>
  );
};

export default App;
