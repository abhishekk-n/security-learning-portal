
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  BookOpen,
  Video,
  FileText,
  ArrowRight,
  Search,
  GraduationCap,
} from "lucide-react";

const sections = [
  {
    title: "Cybersecurity Books",
    description: "Explore guides and books covering essential security concepts.",
    icon: BookOpen,
    path: "/books",
    className: "books",
  },
  {
    title: "Video Tutorials",
    description: "Learn security concepts through practical video lessons.",
    icon: Video,
    path: "/videos",
    className: "videos",
  },
  {
    title: "Security Articles",
    description: "Discover articles about modern cybersecurity topics.",
    icon: FileText,
    path: "/articles",
    className: "articles",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            <ShieldCheck size={18} />
            Cybersecurity Learning Platform
          </span>

          <h1>
            Learn Cybersecurity.
            <span> Build Your Future.</span>
          </h1>

          <p>
            Discover cybersecurity books, videos, and articles.
            Explore application security, cloud security,
            network security, and ethical hacking.
          </p>

          <div className="hero-actions">
            <Link to="/books" className="hero-button primary">
              Explore Resources <ArrowRight size={18} />
            </Link>

            <Link to="/articles" className="hero-button secondary">
              Browse Articles
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <ShieldCheck size={120} strokeWidth={1.3} />
          <p>Learn. Practice. Secure.</p>
        </div>
      </section>

      <section className="home-features">
        <div className="section-heading">
          <span className="section-label">LEARNING LIBRARY</span>
          <h2>Explore Learning Resources</h2>
          <p>
            Choose your preferred way to learn cybersecurity.
          </p>
        </div>

        <div className="feature-grid">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                to={section.path}
                key={section.path}
                className={`feature-card ${section.className}`}
              >
                <div className="feature-icon">
                  <Icon size={30} />
                </div>

                <h3>{section.title}</h3>
                <p>{section.description}</p>

                <span className="feature-link">
                  Explore <ArrowRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-bottom">
        <div>
          <GraduationCap size={32} />
          <h2>Start Your Cybersecurity Journey</h2>
          <p>
            Build your knowledge with curated learning materials
            and explore cybersecurity at your own pace.
          </p>
        </div>

        <Link to="/videos" className="hero-button primary">
          Start Learning <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
