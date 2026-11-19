
import { Routes, Route, Link } from "react-router-dom";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import Articles from "./pages/Articles";

import "./App.css";

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Navbar />

      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/articles" element={<Articles />} />
          <Route
            path="*"
            element={
              <main className="not-found">
                <span className="section-label">404 / PAGE NOT FOUND</span>
                <h1>Looks like you're off the map.</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link className="hero-button primary" to="/">
                  Return Home
                </Link>
              </main>
            }
          />
        </Routes>
      </div>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <ShieldCheck size={26} />
            <div>
              <strong>SECURELEARN</strong>
              <p>Learn today. Secure tomorrow.</p>
            </div>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/videos">Videos</Link>
            <Link to="/articles">Articles</Link>
          </div>

          <a
            href="https://owasp.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-external"
          >
            OWASP Resources <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SecureLearn</span>
          <span>Security Learning Portal</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
