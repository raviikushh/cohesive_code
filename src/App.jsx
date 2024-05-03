import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    //add the BrowserRouter and Routes components
    <>
      {/* add toasts container */}
      <div className="toastsContainer">
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
