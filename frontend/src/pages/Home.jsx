
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  BookOpen,
  Video,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Network,
  Bug,
  LockKeyhole,
  GraduationCap,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { getResources } from "../services/resourceService";
import ResourceCard from "../components/ResourceCard";

const learningTypes = [
  {
    title: "Security Books",
    description:
      "Build strong foundations with carefully selected security guides and reference materials.",
    icon: BookOpen,
    path: "/books",
    countLabel: "Guides & references",
    tone: "blue",
  },
  {
    title: "Video Tutorials",
    description:
      "Understand cybersecurity concepts through engaging, practical video lessons.",
    icon: Video,
    path: "/videos",
    countLabel: "Visual learning",
    tone: "cyan",
  },
  {
    title: "Security Articles",
    description:
      "Explore security concepts, real-world risks, and current defensive practices.",
    icon: FileText,
    path: "/articles",
    countLabel: "Insights & tutorials",
    tone: "violet",
  },
];

const securityDomains = [
  {
    title: "Application Security",
    description: "Secure websites, applications, and APIs.",
    icon: LockKeyhole,
    path: "/articles",
    category: "Application Security",
  },
  {
    title: "Cloud Security",
    description: "Understand cloud infrastructure and protection.",
    icon: Cloud,
    path: "/articles",
    category: "Cloud Security",
  },
  {
    title: "Network Security",
    description: "Explore networks, protocols, and defense.",
    icon: Network,
    path: "/articles",
    category: "Network Security",
  },
  {
    title: "Ethical Hacking",
    description: "Learn security testing and vulnerability analysis.",
    icon: Bug,
    path: "/articles",
    category: "Ethical Hacking",
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Learn the fundamentals",
    description:
      "Start with networking, cybersecurity basics, and core security concepts.",
  },
  {
    number: "02",
    title: "Explore security domains",
    description:
      "Choose application, cloud, network security, or ethical hacking.",
  },
  {
    number: "03",
    title: "Practice and improve",
    description:
      "Use trusted educational resources to build practical knowledge.",
  },
];

export default function Home() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadFeatured() {
      try {
        const data = await getResources("", "", "", {
          signal: controller.signal,
        });

        if (active) {
          setResources(Array.isArray(data) ? data.slice(0, 3) : []);
          setError("");
        }
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setError("Featured resources are temporarily unavailable.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFeatured();

    return () => {
      active = false;
      controller.abort();
    };
  }, [reloadKey]);

  function retryFeatured() {
    setLoading(true);
    setError("");
    setReloadKey((value) => value + 1);
  }

  return (
    <main className="home-page">
      <section className="hero premium-hero">
        <div className="hero-content">
          <span className="hero-label">
            <Sparkles size={16} />
            YOUR CYBERSECURITY LEARNING HUB
          </span>

          <h1>
            Learn to defend.
            <span> Build your security skills.</span>
          </h1>

          <p>
            Discover trusted cybersecurity books, video tutorials,
            and articles. Explore essential security domains and
            develop your knowledge at your own pace.
          </p>

          <div className="hero-actions">
            <Link to="/books" className="hero-button primary">
              Explore Learning Resources
              <ArrowRight size={18} />
            </Link>

            <a href="#learning-domains" className="hero-button secondary">
              Explore Security Domains
            </a>
          </div>

          <div className="hero-highlights">
            <span>
              <CheckCircle2 size={16} />
              Curated resources
            </span>
            <span>
              <CheckCircle2 size={16} />
              Multiple learning formats
            </span>
            <span>
              <CheckCircle2 size={16} />
              Learn at your own pace
            </span>
          </div>
        </div>

        <div className="hero-visual premium-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-shield">
            <ShieldCheck size={100} strokeWidth={1.2} />
          </div>

          <div className="visual-status">
            <span className="status-dot" />
            KNOWLEDGE IS YOUR FIRST DEFENSE
          </div>

          <div className="visual-caption">
            LEARN · UNDERSTAND · SECURE
          </div>
        </div>
      </section>

      <section className="home-features" aria-labelledby="formats-title">
        <div className="section-heading">
          <span className="section-label">EXPLORE THE LIBRARY</span>
          <h2 id="formats-title">Choose how you want to learn</h2>
          <p>
            Discover resources in the format that works best for you.
          </p>
        </div>

        <div className="feature-grid">
          {learningTypes.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`feature-card premium-feature ${item.tone}`}
              >
                <div className="feature-icon">
                  <Icon size={29} />
                </div>

                <span className="feature-eyebrow">{item.countLabel}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <span className="feature-link">
                  Browse resources <ArrowUpRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        className="domains-section"
        id="learning-domains"
        aria-labelledby="domains-title"
      >
        <div className="domains-inner">
          <div className="section-heading">
            <span className="section-label">SECURITY DOMAINS</span>
            <h2 id="domains-title">Explore cybersecurity topics</h2>
            <p>
              Build knowledge across essential cybersecurity disciplines.
            </p>
          </div>

          <div className="domains-grid">
            {securityDomains.map((domain) => {
              const Icon = domain.icon;

              return (
                <article className="domain-card" key={domain.title}>
                  <div className="domain-icon">
                    <Icon size={26} />
                  </div>

                  <h3>{domain.title}</h3>
                  <p>{domain.description}</p>

                  <Link
                    to={`${domain.path}?category=${encodeURIComponent(domain.category)}`}
                    className="domain-link"
                  >
                    Explore topic <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="featured-heading">
          <div>
            <span className="section-label">FROM THE LIBRARY</span>
            <h2 id="featured-title">Featured learning resources</h2>
            <p>Explore a selection from our cybersecurity library.</p>
          </div>

          <Link to="/articles" className="featured-view-all">
            Browse Articles <ArrowUpRight size={17} />
          </Link>
        </div>

        {loading && (
          <div className="featured-grid" aria-label="Loading resources">
            {[1, 2, 3].map((item) => (
              <div className="featured-skeleton" key={item}>
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              </div>
            ))}
            <span className="sr-only" role="status">
              Loading featured resources
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="featured-message" role="alert">
            <p>{error}</p>
            <button
              type="button"
              className="retry-button"
              onClick={retryFeatured}
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        )}

        {!loading && !error && resources.length === 0 && (
          <div className="featured-message">
            <p>No featured resources are available yet.</p>
            <Link to="/books" className="featured-view-all">
              Explore the library <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {!loading && !error && resources.length > 0 && (
          <div className="featured-grid">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </section>

      <section className="pathway-section" aria-labelledby="pathway-title">
        <div className="section-heading">
          <span className="section-label">YOUR LEARNING JOURNEY</span>
          <h2 id="pathway-title">A simple path to get started</h2>
          <p>
            Follow these steps to organize your cybersecurity learning.
          </p>
        </div>

        <div className="pathway-grid">
          {learningSteps.map((step) => (
            <article className="pathway-card" key={step.number}>
              <span className="pathway-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-bottom premium-bottom">
        <div>
          <GraduationCap size={35} aria-hidden="true" />
          <h2>Start building your cybersecurity knowledge.</h2>
          <p>
            Your next learning resource is just one click away.
            Explore the library and start developing your skills.
          </p>
        </div>

        <Link to="/books" className="hero-button primary">
          Start Learning <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
