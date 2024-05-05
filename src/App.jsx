import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./components/dashboard/DashboardPage";

import Header from "./components/layout/Header";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import ProjectPage from "./components/project/ProjectPage";

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
            <Route path='/project/:projectId' element={<ProjectPage />} / >
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/:projectId" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  );
}

export default App;
