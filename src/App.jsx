import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <main className="dark bg-neutral-900 text-white min-h-screen">
        {/* add toasts container */}
        <div className="toastsContainer">
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  );
}

export default App;
