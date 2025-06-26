import { Route, Routes } from "react-router-dom";
import Ask from "./Components/Ask";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ToastContainer } from "react-toastify";
import Logout from "./Components/Logout"
function App() {
  return<>
  

  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/ask" element={<Ask/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/logout" element={<Logout/>}/>
  </Routes>
    <ToastContainer/>
  </>
}

export default App;
