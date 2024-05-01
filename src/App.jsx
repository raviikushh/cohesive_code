import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import EditorPage from "./pages/EditorPage";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
