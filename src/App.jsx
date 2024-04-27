import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import EditorPage from "./pages/EditorPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    //add the BrowserRouter and Routes components
    <> 
    {/* add toasts container */}
    <div className="toastsContainer">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>


      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
