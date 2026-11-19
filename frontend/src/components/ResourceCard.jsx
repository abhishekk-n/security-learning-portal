
import {
  BookOpen,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";

const categoryImages = {
  "Application Security": "/images/application-security.svg",
  "Cloud Security": "/images/cloud-security.svg",
  "Network Security": "/images/network-security.svg",
  "Ethical Hacking": "/images/ethical-hacking.svg",
};

const typeDetails = {
  BOOK: {
    label: "Book",
    action: "Read Book",
    icon: BookOpen,
  },
  VIDEO: {
    label: "Video",
    action: "Watch Video",
    icon: Video,
  },
  ARTICLE: {
    label: "Article",
    action: "Read Article",
    icon: FileText,
  },
};

export default function ResourceCard({ resource }) {
  const details =
    typeDetails[resource.type] || typeDetails.ARTICLE;

  const Icon = details.icon;

  const thumbnail =
    resource.imageUrl ||
    categoryImages[resource.category] ||
    "/images/application-security.svg";

  return (
    <article className="learning-card">
      <div className="learning-card-image">
        <img
          src={thumbnail}
          alt={`${resource.category} illustration`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "/images/application-security.svg";
          }}
        />

        <span className="learning-type-badge">
          <Icon size={15} />
          {details.label}
        </span>
      </div>

      <div className="learning-card-body">
        <span className="learning-category">
          {resource.category}
        </span>

        <h3>{resource.title}</h3>

        <p>{resource.description}</p>

        <div className="learning-card-footer">
          <span className="learning-level">
            {resource.level || "All Levels"}
          </span>

          <a
            href={resource.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="learning-action"
          >
            {details.action}
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}
