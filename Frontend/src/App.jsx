import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import LeetCodepage from "./Components/LeetCodepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/leetcode" element={<LeetCodepage/>}/>
    </Routes>
  );
}

export default App;