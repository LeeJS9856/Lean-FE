import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Main from "./pages/Main.jsx";

function App() {
  return (
    <Routes>
      <Route path={routes.main} element={<Main />} />
      <Route path={routes.signin} element={<Signin />} />
      <Route path={routes.signup} element={<Signup />} />
    </Routes>
  );
}

export default App;