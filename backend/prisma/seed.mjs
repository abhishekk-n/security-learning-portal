
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const resources = [
  {
    title: "OWASP Web Security Testing Guide",
    description: "A comprehensive guide to testing web application security.",
    type: "BOOK",
    category: "Application Security",
    resourceUrl: "https://owasp.org/www-project-web-security-testing-guide/",
    level: "Intermediate",
  },
  {
    title: "OWASP API Security Top 10",
    description: "Learn the most important security risks affecting modern APIs.",
    type: "ARTICLE",
    category: "Application Security",
    resourceUrl: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
    level: "Beginner",
  },
  {
    title: "PortSwigger Web Security Academy",
    description: "Free interactive training in web application security.",
    type: "ARTICLE",
    category: "Ethical Hacking",
    resourceUrl: "https://portswigger.net/web-security",
    level: "Beginner",
  },
  {
    title: "AWS Security Fundamentals",
    description: "Introduction to cloud security principles and AWS security services.",
    type: "ARTICLE",
    category: "Cloud Security",
    resourceUrl: "https://aws.amazon.com/security/",
    level: "Beginner",
  },
  {
    title: "Professor Messer Security+ Training",
    description: "Free video training covering cybersecurity fundamentals.",
    type: "VIDEO",
    category: "Network Security",
    resourceUrl: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/",
    level: "Beginner",
  },
  {
    title: "Cisco Networking Academy",
    description: "Explore networking and cybersecurity learning materials.",
    type: "ARTICLE",
    category: "Network Security",
    resourceUrl: "https://www.netacad.com/",
    level: "Beginner",
  },
];

async function main() {
  for (const resource of resources) {
    const existing = await prisma.resource.findFirst({
      where: { resourceUrl: resource.resourceUrl },
    });

    if (!existing) {
      await prisma.resource.create({ data: resource });
    }
  }

  console.log("Cybersecurity resources seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
