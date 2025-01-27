import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Header from "./components/Header"
import Register from "./pages/Register";
import NewThread from "./pages/NewThread";


function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('../public/background.svg')] bg-center bg-repeat blur-[4px] z-0 scale-105"
      />
      <div className="relative px-6 z-10">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/thread/:threadId" element={<Thread />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new_thread" element={<NewThread />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;