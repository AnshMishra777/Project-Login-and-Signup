import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signin from "./Components/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;