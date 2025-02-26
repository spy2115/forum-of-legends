import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Header from "./components/Header"
import Register from "./pages/Register";
import NewThread from "./pages/NewThread";
import Categories from "./pages/Categories";
import CategoryThreads from "./pages/CategoryThreads";
import Followed from "./pages/Followed";



function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('../public/background.svg')] bg-center bg-repeat blur-[4px] z-0 scale-105"
      />
      <div className="relative px-6 z-10">
        <BrowserRouter>
        <Header />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/thread/:threadId" element={<Thread />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new_thread" element={<NewThread />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/threads/:catId" element={<CategoryThreads />} />
            <Route path="/followed" element={<Followed />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;