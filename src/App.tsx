import "./App.css";
import AuthRoute from "./components/AuthRoute";
import UserContext from "./context/userContext";
import useUser from "./hooks/useUser";
import Router from "./Router";

function App() {
  const userData = useUser();
  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <p>One Health</p>
        <AuthRoute />
        <Router />
      </div>
    </UserContext.Provider>
  );
}

export default App;
