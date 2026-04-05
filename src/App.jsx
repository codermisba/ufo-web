import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DataDashboard from "./components/DataDashboard";
import ImageGallery from "./components/ImageGallery";
import UFOCreator from "./components/UFOCreator";
import CommunityForm from "./components/CommunityForm";
import ChatbotUI from "./components/ChatbotUI";
import Starfield from "./components/Starfield";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white overflow-hidden font-sans relative">
        <Starfield />
        <Navbar />
        <div className="pt-16">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DataDashboard />} />
            <Route path="/gallery" element={<ImageGallery />} />
            <Route path="/creator" element={<UFOCreator />} />
            <Route path="/report" element={<CommunityForm />} />
            </Routes>
        </div>
        <ChatbotUI />
        
        <footer className="py-8 border-t border-white/10 text-center text-gray-500 mt-20 glass bg-black/50 backdrop-blur-md relative z-10">
          <p>© 2026 UFO Insight. All classified rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
