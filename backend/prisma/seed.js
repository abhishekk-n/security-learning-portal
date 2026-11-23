
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

// 30 cybersecurity learning resources.
// Existing resources are skipped using resourceUrl.

const resources = [
  ["OWASP Web Security Testing Guide", "A comprehensive guide to testing web application security.", "BOOK", "Application Security", "https://owasp.org/www-project-web-security-testing-guide/", "Intermediate"],
  ["OWASP API Security Top 10", "Learn the most important security risks affecting modern APIs.", "ARTICLE", "Application Security", "https://owasp.org/API-Security/editions/2023/en/0x11-t10/", "Beginner"],
  ["PortSwigger Web Security Academy", "Free interactive training in web application security.", "ARTICLE", "Ethical Hacking", "https://portswigger.net/web-security", "Beginner"],
  ["AWS Security Fundamentals", "Introduction to cloud security principles and AWS security services.", "ARTICLE", "Cloud Security", "https://aws.amazon.com/security/", "Beginner"],
  ["Professor Messer Security+ Training", "Free video training covering cybersecurity fundamentals.", "VIDEO", "Network Security", "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/", "Beginner"],
  ["Cisco Networking Academy", "Explore networking and cybersecurity learning materials.", "ARTICLE", "Network Security", "https://www.netacad.com/", "Beginner"],
  ["OWASP Top 10 Web Application Risks", "Overview of common and critical web application security risks.", "ARTICLE", "Application Security", "https://owasp.org/www-project-top-ten/", "Beginner"],
  ["OWASP Cheat Sheet Series", "Practical application security implementation and testing guidance.", "ARTICLE", "Application Security", "https://cheatsheetseries.owasp.org/", "Intermediate"],
  ["OWASP ASVS", "Application Security Verification Standard requirements and controls.", "BOOK", "Application Security", "https://owasp.org/www-project-application-security-verification-standard/", "Advanced"],
  ["OWASP Juice Shop", "Deliberately vulnerable web application for hands-on security practice.", "ARTICLE", "Ethical Hacking", "https://owasp.org/www-project-juice-shop/", "Intermediate"],
  ["OWASP ZAP", "Open-source web application security testing tool and documentation.", "ARTICLE", "Ethical Hacking", "https://www.zaproxy.org/", "Intermediate"],
  ["PortSwigger SQL Injection", "Learn SQL injection vulnerabilities through explanations and labs.", "ARTICLE", "Application Security", "https://portswigger.net/web-security/sql-injection", "Intermediate"],
  ["PortSwigger Cross-site Scripting", "Understand and practice finding cross-site scripting vulnerabilities.", "ARTICLE", "Application Security", "https://portswigger.net/web-security/cross-site-scripting", "Intermediate"],
  ["PortSwigger Authentication Vulnerabilities", "Explore common authentication weaknesses and testing approaches.", "ARTICLE", "Application Security", "https://portswigger.net/web-security/authentication", "Intermediate"],
  ["MDN Web Security", "Browser and web platform security concepts for developers.", "ARTICLE", "Application Security", "https://developer.mozilla.org/en-US/docs/Web/Security", "Beginner"],
  ["Google Web Security", "Security guidance for modern web applications.", "ARTICLE", "Application Security", "https://web.dev/learn/privacy", "Beginner"],
  ["NIST Cybersecurity Framework", "Framework for identifying, managing, and reducing cybersecurity risk.", "BOOK", "Network Security", "https://www.nist.gov/cyberframework", "Intermediate"],
  ["NIST SP 800-53", "Catalog of security and privacy controls for information systems.", "BOOK", "Network Security", "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", "Advanced"],
  ["CISA Secure by Design", "Principles for building safer products and reducing security risks.", "ARTICLE", "Application Security", "https://www.cisa.gov/securebydesign", "Beginner"],
  ["CISA Cybersecurity Best Practices", "Guidance and resources for strengthening organizational security.", "ARTICLE", "Network Security", "https://www.cisa.gov/topics/cybersecurity-best-practices", "Beginner"],
  ["MITRE ATT&CK", "Knowledge base of adversary tactics and techniques.", "ARTICLE", "Ethical Hacking", "https://attack.mitre.org/", "Intermediate"],
  ["MITRE CWE", "Common Weakness Enumeration for software and hardware weaknesses.", "ARTICLE", "Application Security", "https://cwe.mitre.org/", "Intermediate"],
  ["MITRE CVE", "Learn about publicly disclosed cybersecurity vulnerabilities.", "ARTICLE", "Network Security", "https://www.cve.org/", "Beginner"],
  ["Cloudflare Learning Center Security", "Accessible explanations of network and application security topics.", "ARTICLE", "Network Security", "https://www.cloudflare.com/learning/security/", "Beginner"],
  ["AWS Well-Architected Security Pillar", "Cloud security design principles and architecture best practices.", "BOOK", "Cloud Security", "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html", "Intermediate"],
  ["AWS IAM Documentation", "Understand identity, permissions, and access management in AWS.", "ARTICLE", "Cloud Security", "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html", "Beginner"],
  ["Microsoft Azure Security Documentation", "Security guidance for Azure cloud workloads and services.", "ARTICLE", "Cloud Security", "https://learn.microsoft.com/en-us/azure/security/", "Intermediate"],
  ["Google Cloud Security Overview", "Learn security concepts and controls for Google Cloud.", "ARTICLE", "Cloud Security", "https://cloud.google.com/security", "Beginner"],
  ["Kubernetes Security Documentation", "Security concepts for Kubernetes clusters and workloads.", "ARTICLE", "Cloud Security", "https://kubernetes.io/docs/concepts/security/", "Advanced"],
  ["Linux Foundation OpenSSF", "Open-source software supply-chain security learning resources.", "ARTICLE", "Application Security", "https://openssf.org/", "Intermediate"],
];

async function main() {
  let added = 0;
  let skipped = 0;

  for (const [
    title,
    description,
    type,
    category,
    resourceUrl,
    level,
  ] of resources) {
    const existing = await prisma.resource.findFirst({
      where: { resourceUrl },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.resource.create({
      data: {
        title,
        description,
        type,
        category,
        resourceUrl,
        level,
        imageUrl: null,
      },
    });

    added++;
    console.log(`Added: ${title}`);
  }

  const total = await prisma.resource.count();

  console.log(
    `Seed complete: ${added} added, ${skipped} already present. Total: ${total}`
  );
}

try {
  await main();
} catch (error) {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
