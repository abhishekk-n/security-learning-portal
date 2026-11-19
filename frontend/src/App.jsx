
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import Articles from "./pages/Articles";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      <footer>
        <p>© 2026 Security Learning Portal</p>
      </footer>
    </div>
  );
}

export default App;
