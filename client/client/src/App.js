import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Thread from "./pages/Thread";
import Header from "./components/Header"


function App() {
  

  return (
    <div className="px-6 bg-slate-900 min-h-screen">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/thread/:threadId" element={<Thread />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;