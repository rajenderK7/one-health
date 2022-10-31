import "./App.css";
import UserNavbar from "./components/user/UserNavbar";
import UserContext from "./context/userContext";
import useUser from "./hooks/useUser";
import PublicRoutes from "./PublicRoutes";
import Router from "./Router";

function App() {
  const userData = useUser();
  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <UserNavbar />
        <PublicRoutes />
        <Router />
      </div>
    </UserContext.Provider>
  );
}

export default App;
